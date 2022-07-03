const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require("config");
const User = require("../models/User");
const { userTypes } = require('../models/User');
const tokenService = require('../services/token.service.js');



const router = Router();

router.post(
	'/register', 
	[
		check('email','Incorrect email').isEmail(),
		check('password','Minimum length 6 symbols').isLength({min:6})
	]
	,async(req,res)=>{
	try{
		console.log(req.body);

		const errors = validationResult(req);

		if(!errors.isEmpty())
		{
			return res.status(400).json({
				errors:errors.array(),
				message:'Incorrect fields'
			});

		}

		const {email,password} = req.body;

		const candidate = await User.findOne({email:email});

		if(candidate)
		{
			return res.status(400).json({message:"User already exists"});
		}


		const hashedPassword = await bcrypt.hash(password, 12);

		const userType = userTypes.Admin;

		const user = new User({email,password:hashedPassword,userType:userType});

		await user.save();

		res.status(201).json({message:"User successfully added"});

	}catch(e)
	{
		console.log(e.message);
		res.status(500).json({message:"something went wrong, try again"});
	}
})

router.post('/login',[
		check('email','Type correct email').isEmail(),
		check('password','Password is wrong').exists()
	],async(req,res)=>{
	try{

		const errors = validationResult(req);

		if(!errors.isEmpty())
		{
			return res.status(400).json({
				errors:errors.array(),
				message:''
			});

		}

		const {email, password} = req.body;

		const user = await User.findOne({email});

		if(!user)
		{
			return res.status(400).json({message:"User not found"});
		}else if(!user.isEmailVerified)
		{
			return res.status(400).json({message:"Email address is not verified. Please check your email and go through the link"});
		}
		else if(!user.isActive)
		{
			return res.status(400).json({message:"Profile is not active, please contact your manager"});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if(!isMatch)
		{
			return res.status(400).json({message:"Wrong email or password , try again"});
		}

		const tokens = tokenService.generateToken({userId:user.id});
		await tokenService.saveToken(user.id,tokens.refreshToken);

		res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60*1000, httpOnly: true})//30 * 24 * 60 * 60 * 1000

		res.json({accessToken:tokens.accessToken,userId:user.id,userType:user.userType});


	}catch(e)
	{
		console.log(e);
		res.status(500).json({message:"something went wrong, try again"});
	}
})


router.post('/refresh',async(req,res)=>{
	try{
		const {refreshToken} = req.cookies;

		if (!refreshToken) {
			return res.status(402).json({message:"Refresh not valid"});
		}

		const userData = tokenService.validateRefreshToken(refreshToken);

		console.log("userData",userData);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		console.log("tokenFromDb",tokenFromDb);
		if (!userData || !tokenFromDb) {
			return res.status(402).json({message:"Refresh not valid"});
		}
		const user = await User.findById(userData.userId);
		const tokens = tokenService.generateToken({userId:user.id});

		await tokenService.saveToken(user.id,tokens.refreshToken);

		res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60*1000, httpOnly: true})//30 * 24 * 60 * 60 * 1000
		res.json({accessToken:tokens.accessToken,userId:user.id,userType:user.userType});


	}catch(e)
	{
		console.log(e);
		res.status(500).json({message:"something went wrong, try again"});
	}
})


module.exports = router;
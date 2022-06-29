const {Router} = require("express");
const bcrypt = require('bcryptjs');
const {check,validationResult} = require("express-validator");
const User = require("../models/User");
const { userTypes } = require('../models/User');
const auth = require("../middleware/auth.middleware");
const nodemailer = require("nodemailer");
const config = require('config');


const router = Router();

router.get("/", auth,async (req,res)=>{
    try{

        const requestorUser = await User.findOne({_id:{$eq:req.user.userId}});

        let query ={};
        if(requestorUser.userType === userTypes.Admin)
        {
            query = { _id: { $not:{$eq: req.user.userId }} };
        }
        else
        {
            query = {parent:{$eq:req.user.userId}}
        }

        const users = await User.find(query).populate("parent");
        res.json(users);
    }catch(e)
    {
        res.status(500).json({message:"something went wrong, try again"});
    }
})


module.exports = router
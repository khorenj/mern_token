const jwt = require("jsonwebtoken");
const config = require("config");
const tokenService = require('../services/token.service.js');

module.exports = (req,res,next)=>{
    if(req === "OPTIONS")
    {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token)
        {
           return res.status(401).json({message:"not authorized"});
        }

        const userData = tokenService.validateAccessToken(token);
        if(userData)
        {
            req.user = userData;
            next();
        }
        else
        {
            res.status(401).json({message:"token expired"});
        }


    }
    catch (e)
    {
        res.status(401).json({message:"token expired"});
    }
}
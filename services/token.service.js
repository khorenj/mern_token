const jwt = require('jsonwebtoken');
const config = require("config");
const UserToken = require("../models/UserToken");

class TokenService {

    generateToken(payload)
    {
        const accessToken = jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn:"10s"}
        );

        const refreshToken = jwt.sign(
            payload,
            config.get("jwtRefreshSecret"),
            {expiresIn:"1y"}
        );

        return {accessToken,refreshToken}
    }

    validateAccessToken(token)
    {
        try {
            const userData = jwt.verify(token, config.get("jwtSecret"));
            return userData;
        }catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken)
    {
        try {
            const userData = jwt.verify(token, config.get("jwtRefreshSecret"));
            return userData;
        }catch (e) {
            return null;
        }
    }



    async saveToken(userId,refreshToken)
    {
        const tokenData = await UserToken.findOne({userId:userId});

        if(tokenData)
        {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await  UserToken.create({
            userId:userId,
            refreshToken:refreshToken
        });

        return  token;
    }

    async removeToken(refreshToken)
    {
        const tokenData = UserToken.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken)
    {
        const tokenData = UserToken.findOne({refreshToken});
        return tokenData;
    }

}

module.exports = new TokenService();
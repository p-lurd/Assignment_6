
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();






// -----------------to authenticate user-------------
const apiKeyAuth = (req, res, next) => {
    const authHeader = req.headers;

    if (!authHeader.api_key) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const existingUser = parsedUsersList.find(parsedUsersList => parsedUsersList.api_key === authHeader.api_key)
    if (existingUser) {
        req.user = existingUser
        next();
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
}




// --------------------to check if it is an admin-------------
const checkAdmin = (req, res, next) => {
    
    console.log(req.user.role)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized!' });
    }

    next()
}


const bearerTokenAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers;

        if (!authHeader.authorization){
            return res.status(401).json({message: "you are authenticated"})
        }
        const token = authHeader.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findOne({where: {id: decoded.id}})

        if (!user){
            return res.status(401).json({
                message: "Unauthorized",
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}


module.exports = {
    apiKeyAuth,
    checkAdmin,
    bearerTokenAuth
}
const path = require("path");
const mongoose = require('mongoose')
const UserModel = require('../models/user'); 
const jwt = require('jsonwebtoken');
// const logger = require('../logger');
require('dotenv').config();



// -----------To create user and admin--------------------
const createUser = async (req, res, next) => {

  try {
    const bodyOfRequest = req.body;
    const username = bodyOfRequest.email;
    const usernameDomain = username.split("@")[1];
    const existedUsername = await UserModel.findOne({where: {email: username}})
    if (existedUsername) {
      const duplicateUserError = new Error("User already exists");
      duplicateUserError.status = 409;
      throw duplicateUserError;
    }



    if (usernameDomain === "altschool.com") {
      

      const user = await UserModel.create({
        name: bodyOfRequest.name,
        email: bodyOfRequest.email,
        password: bodyOfRequest.password,
        phone_number: bodyOfRequest.phone_number,
        gender: bodyOfRequest.gender,
        role: "admin" 
      });

      const token = await jwt.sign({ email: user.email, id: user.id}, process.env.JWT_SECRET)

      return res.status(201).json({
        message: 'User created successfully',
        user,
        token
    })

    } else {
      
      const user = await UserModel.create({
        name: bodyOfRequest.name,
        email: bodyOfRequest.email,
        password: bodyOfRequest.password,
        phone_number: bodyOfRequest.phone_number,
        gender: bodyOfRequest.gender,
        role: "ordinaryUser" 
      });

      const token = await jwt.sign({ email: user.email, id: user.id}, process.env.JWT_SECRET)

      return res.status(201).json({
        message: 'User created successfully',
        user,
        token
    })
    }
  } catch (error) {
    next(error)
  }

}


// ---------------to login--------------

const login = async (req, res, next) => {
  try {
    const bodyOfRequest = req.body;
    const user = await UserModel.findOne({
      email: bodyOfRequest.email
    });
    if (!user){
      const userNotFound = new Error ("User not found");
      userNotFound.status = 404;
      throw userNotFound;
    }

    const validPassword = await user.isValidPassword(bodyOfRequest.password);
    
    if(!validPassword){
      const invalidCredientials = new Error ("email or password is wrong");
      invalidCredientials.status =422;
      throw invalidCredientials;
    };

    const token = await jwt.sign({ email: user.email, id: user.id}, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' });
    
    // logger.info('[CreateUser] => login process done')

    return res.status(200).json({
      message: 'login successful',
      user,
      token  
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  login
};


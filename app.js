const express = require("express");
const { postItem,getItems } = require("./controller");
const userController = require('./users/user.controller')
const path = require('path')
const mongoose = require ('mongoose');
require ('dotenv').config();
const db = require('./db')

const app = express();

db.connect();

app.use(express.json());    //body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const homepagePath = path.join(__dirname, "public", "index.html");
const notFound = path.join(__dirname, "public", "404.html");
const globalMiddlewares = require('./middlewares/global.middleware');
const userMiddlewares = require('./users/user.middleware')



// -----------To create user and admin--------------------
app.post("/v1/signup", userMiddlewares.ValidateUserCreation, userController.createUser);

// -----------To login----------------------
app.post('/v1/login',userMiddlewares.loginValidation, userController.login);


// ----------------to authenticate user-----------------
app.use(globalMiddlewares.bearerTokenAuth);




//-------------To create item---------------------
app.post("/v1/items",globalMiddlewares.checkAdmin, postItem);

// ------------------To get all items-----------------------
app.get('/v1/items', getItems)




app.use((error, req, res, next) => {
  if (error.status == 404) return res.status(404).sendFile(notFound);
  res.status(error.status ?? 500)
  res.send(error.message)
})

app.listen(3001, () => {
  console.log("Hello");
});

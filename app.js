const express = require("express");
const path = require("path");
const { postItem,getItems, getOneItem, updateItem, deleteItem } = require("./controller");
const userController = require('./users/user.controller')
const sequelize = require('./config/sequelize');
require ('dotenv').config();

const app = express();

app.use(express.json());
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


// // ---------------To get one item----------------------
// app.get('/v1/items/:id', getOneItem)

// // -----------------To update an item---------------
// app.patch('/v1/items/:id',globalMiddlewares.checkAdmin, updateItem);


// // ---------------- To delete an item----------------
// app.delete('/v1/items/:id',globalMiddlewares.checkAdmin,deleteItem);


app.use((error, req, res, next) => {
  if (error.status == 404) return res.status(404).sendFile(notFound);
  res.status(error.status ?? 500)
  res.send(error.message)
})


sequelize.authenticate().then(()=>{
  console.log('connected to DB succesfully')
}).catch((error)=>{
  console.log('Error connecting to DB', error) 
})

app.listen(3001, () => {
  console.log("Hello");
});

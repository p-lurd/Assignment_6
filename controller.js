const mongoose = require('mongoose');
const ItemModel = require('./models/item');




//-------------To create item---------------------
const postItem = async (req, res, next) => {
  try {
    const bodyOfRequest = req.body;
    // console.log(bodyOfRequest);
    if (!bodyOfRequest.name || !bodyOfRequest.price || !bodyOfRequest.size) {
      const badRequestError = new Error("name, price & size are required, kindly fill correctly");
      badRequestError.status = 400;
      throw badRequestError;
    }

    const item = await ItemModel.create({
      name: bodyOfRequest.name,
      price: bodyOfRequest.price,
      size: bodyOfRequest.size,
      quantity: bodyOfRequest.quantity,
      category_id: bodyOfRequest.category_id,
      user_id: bodyOfRequest.user_id 
    });

    res.status(201).json({
      message: "item created succesfully",
      item: item

    })
  } catch (error) {
    next(error)
  }

}

// -----------------to get list of items-------------------
const getItems = async (req, res, next)=>{
  try {
    const itemsList = await ItemModel.find({}).select('name');
    const itemsListArray = itemsList.map(item => item.name);
    if(!itemsListArray){
      const noItemError = new Error ("No Item Found");
      noItemError.status = 404;
      throw noItemError;
    }
    res.status(200).json({
      itemsListArray
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  postItem,
  getItems

};
const mongoose = require('mongoose');
const shortid = require('shortid');


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Item = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: { type: String, required: true },
  price: { type: String, unique: false },
  size:  { 
    type: String, 
    required: true,
    enum: ['small', 'medium', 'large']
    },
  category_id: {
    type: String,
    required: false,
    ref: "categories"
  },
  user_id: {
    type: String,
    required: false,
    ref: "users"
  }
  });

 

const ItemModel = mongoose.model('items', Item);

module.exports = ItemModel;
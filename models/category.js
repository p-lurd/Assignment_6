const mongoose = require('mongoose');
const shortid = require('shortid');


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Category = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: { type: String, required: true },
  created_at: { type: Date, default: new Date() }
  });

 

const CategoryModel = mongoose.model('categories', Category);

module.exports = CategoryModel;
const mongoose = require('mongoose');
const shortid = require('shortid');


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Order = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: { type: String, required: true },
  status:  { 
    type: String, 
    required: true,
    enum: ['pending', 'approved']
    },
    quantity: { type: String },
    order_date: { type: Date, default: new Date()},
    user_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "user"
    }
  });

 

const OrderModel = mongoose.model('orders', Order);

module.exports = ItemModel;
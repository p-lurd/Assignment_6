const mongoose = require('mongoose');
const shortid = require('shortid');


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Item_order = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
    category_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "category"
     },
    user_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "user"
    }
});


const Item_orderModel = mongoose.model('item_orders', Item_order);
module.exports = Item_orderModel;
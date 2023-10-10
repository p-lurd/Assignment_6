const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true},
  phone_number: { type: String, unique: true  },
  gender:  { 
    type: String, 
    required: true,
    enum: ['male', 'female']
  },
    role: { type: String, default: 'user' },  
    created_at: { type: Date, default: new Date() }
});

// before save
User.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
})

User.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

// after save

// before update

// after update

const UserModel = mongoose.model('users', User);

module.exports = UserModel;
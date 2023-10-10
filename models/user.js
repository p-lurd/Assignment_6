'use strict';

const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes, Model, UUIDV4 } = require('sequelize');
const bcrypt = require('bcrypt');



const User = sequelize.define('users', {
  id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
  },
  role: {
    type: DataTypes.ENUM,
    values:['admin', 'ordinaryUser']
  },
  created_at: {
      type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
}
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});


User.prototype.isValidPassword = async function(password) {
  const user = this;
  console.log({user: user});
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}






// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

module.exports = User
















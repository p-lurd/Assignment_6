
'use strict';

const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes, Model, UUIDV4 } = require('sequelize');
const bcrypt = require('bcrypt');



const Item = sequelize.define('Items', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
  },
  size: {
      type: DataTypes.ENUM,
      values: ['small', 'medium', 'large'],
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{model: 'categories', key: 'id'}
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{model: 'users', key: 'id'}
  }
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: false
})







// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

module.exports = Item












// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class item extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   item.init({
//     name: DataTypes.STRING,
//     price: DataTypes.STRING,
//     size: {
//       type: DataTypes.STRING,
//       values: ['small','medium','large']
//     },
//     quantity: DataTypes.STRING,
//     category_id: DataTypes.STRING,
//     user_id: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'item',
//   });
//   return item;
// };





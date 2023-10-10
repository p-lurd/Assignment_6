'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    status: {
      type: DataTypes.ENUM,
      values:['pending','approved','disapproved'],
      defaultValue:'pending'
    },
    quantity: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return order;
};
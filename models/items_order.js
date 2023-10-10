'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items_order.init({
    order_id: DataTypes.STRING,
    item_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'items_order',
  });
  return items_order;
};
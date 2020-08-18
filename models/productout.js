'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductOut.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    }
  };
  ProductOut.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductOut',
    tableName: 'ProductOut'
  });
  return ProductOut;
};
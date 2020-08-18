'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductIn.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    }
  };
  ProductIn.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductIn',
    tableName: 'ProductIn'
  });
  return ProductIn;
};
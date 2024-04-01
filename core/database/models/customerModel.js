// customerModel -> página para inserção de todas as colunas da tabela "customer"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');
const StoreModel = require('./storeModel');
const AddressModel = require('./addressModel');

const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      onUpdate: new Date()
    },
  }, {
    tableName: 'customer',
    timestamps: false,
  });

// Definindo a associação entre o modelo Customer e o modelo Address
Customer.belongsTo(StoreModel, {
    foreignKey: 'store_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Customer.belongsTo(AddressModel, {
    foreignKey: 'address_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

  module.exports = Customer;
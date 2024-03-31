// inventoryModel -> página para inserção de todas as colunas da tabela "inventory"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');

const Inventory = sequelize.define('Inventory', {
  inventory_id: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  film_id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
  },
  store_id: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    onUpdate: new Date()
  },
}, {

  tableName: 'inventory',
  timestamps: false,
});

module.exports = Inventory;
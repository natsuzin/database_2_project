// rentalModel -> página para inserção de todas as colunas da tabela "rental"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');
const InventoryModel = require("./inventoryModel");
const CustomerModel = require("./customerModel");
const StaffModel = require("./staffModel");

const Rental = sequelize.define('Rental', {
    rental_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    staff_id: {
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
    tableName: 'rental', 
    timestamps: false, 
  });

  // Definindo as associações entre os modelos
Rental.belongsTo(InventoryModel, {
  foreignKey: 'inventory_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

Rental.belongsTo(CustomerModel, {
  foreignKey: 'customer_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

Rental.belongsTo(StaffModel, {
  foreignKey: 'staff_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

  module.exports = Rental;
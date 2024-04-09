const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');

const Person = sequelize.define('person', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  sex: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
  {
    tableName: 'person',
    timestamps: false
  }
);

module.exports = Person;
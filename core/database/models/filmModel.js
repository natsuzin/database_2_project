// filmModel -> página para inserção de todas as colunas da tabela "film"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');

const Film = sequelize.define('Film', {
  film_id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  release_year: {
    type: DataTypes.DATEONLY, 
    defaultValue: null,
  },
  language_id: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  },
  original_language_id: {
    type: DataTypes.TINYINT.UNSIGNED,
    defaultValue: null,
  },
  rental_duration: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 3,
  },
  rental_rate: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    defaultValue: 4.99,
  },
  length: {
    type: DataTypes.SMALLINT.UNSIGNED,
    defaultValue: null,
  },
  replacement_cost: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 19.99,
  },
  rating: {
    type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
    defaultValue: 'G',
  },
  special_features: {
    type: DataTypes.JSON, 
    defaultValue: null,
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    onUpdate: new Date()
  },
}, {
  tableName: 'film',
  timestamps: false, 
});

module.exports = Film;
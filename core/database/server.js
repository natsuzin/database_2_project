const Sequelize = require("sequelize");
require("dotenv").config(); // biblioteca 'dotenv' do node

const dbName = process.env.dbName; 
const dbUser = process.env.dbUser;
const dbHost = process.env.dbHost;
const dbPassword = process.env.dbPass;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost, 
  models: [],
  logging: false
});

module.exports = sequelize;
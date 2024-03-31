const express = require("express"); // 'express' -> é um framework do node - serve como um servidor web (API)
const app = express();
const db = require("./core/database/server");
require("dotenv").config(); // biblioteca 'dotenv' do node
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_autogen.json');
const bodyParser = require('body-parser');

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

app.use(bodyParser.json());
app.use(`/api-doc`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/rental', require('./core/controllers/rentalController')); // uma rota do servidor para Rental
app.use('/inventory', require('./core/controllers/inventoryController')); // uma rota do servidor para Inventory
app.use('/customer', require('./core/controllers/customerController')); // uma rota do servidor para Customer


app.listen(3001, () => console.log("conectado à porta 3001"));
// SWAGGER -> biblioteca que gera um json de um ambiente web para visualização dos dados do banco (tipo o insomnia)

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API!',
        description: 'API of app',
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

const outputFile = './swagger_autogen.json';
const endpointsFiles = [
    './core/controllers/customerController.js', 
    './core/controllers/inventoryController.js', 
    './core/controllers/rentalController.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);

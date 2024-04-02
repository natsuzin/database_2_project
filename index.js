const db = require("./core/database/server");
const prompt = require('prompt-sync')({sigint: true});
const { getAllCustomers, createCustomer } = require("./core/controllers/customerController");
const { getAllInventories } = require("./core/controllers/inventoryController");
const { getAllRentals } = require("./core/controllers/rentalController");
const Store = require("./core/database/models/storeModel");

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

async function listAllCustomers(){
    try{
        const customers = await getAllCustomers()
        console.log('Customers: ', customers.length )
       // customers.forEach(customers => console.log(customers.toJSON()));
        //TO DO: verificar a melhor forma de exibir esses dados, com o JSON, por algum motivo, alguns dados são excluidos da busca
        // 
    }catch(err){
        console.log(err)
    }
}

async function listAllInventories(){
    try{
        const inventories = await getAllInventories();
        console.log('Inventories: ')
        inventories.forEach(inventories => console.log(inventories.toJSON()));
    }catch(err){
        console.log(err)
    }
}

async function listAllRentals() {
    try{
        const rentals = await getAllRentals();
        console.log('Rentals: ')
        rentals.forEach(rentals => console.log(rentals.toJSON()));
    }catch(err){
        console.log(err)
    }
}

async function insertCustomer(){
    try{
        const customer = {
            store_id: '',
            email: '',
            address_id: '',
            active: ''
        }
        customer.first_name = prompt('Nome: ');
        customer.last_name = prompt('Sobrenome: ');
        customer.email = prompt('Email: ');
        customer.address_id = parseInt(prompt('ID Endereço: '));
        customer.store_id = parseInt(prompt('ID Loja: '));
        customer.active = prompt('Ativo (true/false): ') === 'true'
        console.log(customer)
        createCustomer(customer)
    }catch(err){
        console.err(err);
        throw err;
    }
}


function menu(){
    console.log('=-=-=-=- MENU -=-=-=-=');
    console.log(`1. Listar tabela de 'Customer'`);
    console.log(`2. Listar tabela de 'Rental'`);
    console.log(`3. Listar tabela de 'Inventory'`);
    console.log(`4. Inserir dados na tabela de 'Customer`);
    console.log(`5. Inserir dados na tabela de 'Rental'`);
    console.log(`6. Inserir dados na tabela 'Inventory'`);
}

function main(){
    menu();
    let option = prompt('\nSelecione uma opção: ');
    switch(option){
        case '1':
           listAllCustomers();
           break;
        case '2': 
            listAllInventories();
            break;
        case '3': 
            listAllRentals();
            break;
        case '4': {
            console.log('\n Cadastro de Cliente: \n')
            insertCustomer();
        }
    }
}

main();

/*
const express = require("express"); // 'express' -> é um framework do node - serve como um servidor web (API)
const app = express();
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
app.use(`/api-doc`, swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //localhost:3001/api-doc
app.use('/rental', require('./core/controllers/rentalController')); // uma rota do servidor para Rental
app.use('/inventory', require('./core/controllers/inventoryController')); // uma rota do servidor para Inventory
app.use('/customer', require('./core/controllers/customerController')); // uma rota do servidor para Customer


app.listen(3001, () => console.log("conectado à porta 3001")); */
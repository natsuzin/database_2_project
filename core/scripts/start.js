const db = require("../database/server");
const prompt = require('prompt-sync')({sigint: true});
const { getAllCustomers, createCustomer } = require("./customer");
const { getAllInventories } = require("./inventory");
const { getAllRentals } = require("./rental");

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
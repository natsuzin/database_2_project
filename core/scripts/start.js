const db = require("../database/server");
const prompt = require('prompt-sync')({sigint: true});
const { getAllCustomers, createCustomer, listAllCustomers, insertCustomer } = require("./customer");
const { getAllInventories, createInventory, listAllInventories } = require("./inventory");
const { getAllRentals, createRental, listAllRentals } = require("./rental");

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

function menu(){
    console.log('=-=-=-=-=- MENU -=-=-=-=-=');
    console.log(`1. Listar tabela de 'Customer'`);
    console.log(`2. Listar tabela de 'Rental'`);
    console.log(`3. Listar tabela de 'Inventory'`);
    console.log(`4. Inserir dados na tabela de 'Customer`);
    console.log(`5. Inserir dados na tabela de 'Rental'`);
    console.log(`6. Inserir dados na tabela 'Inventory'`);
}

function main(){
    menu();
    let option = prompt('\nInsira uma opção: ');
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
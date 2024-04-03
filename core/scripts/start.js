const db = require("../database/server");
const prompt = require('prompt-sync')({sigint: true});
const { listAllCustomers, insertCustomer } = require("./customer");
const { listAllInventories, insertInventory } = require("./inventory");
const { listAllRentals, insertRental } = require("./rental");

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

function menu(){
    console.log('\n=-=-=-=-=- MENU -=-=-=-=-=');
    console.log(`1. Listar tabela de 'Customer'`);
    console.log(`2. Listar tabela de 'Rental'`);
    console.log(`3. Listar tabela de 'Inventory'`);
    console.log(`4. Inserir dados na tabela de 'Customer`);
    console.log(`5. Inserir dados na tabela de 'Rental'`);
    console.log(`6. Inserir dados na tabela 'Inventory'`);
    console.log(`7. Sair do sistema`)
}

async function main(){
    let option = 0;
    while(option !== '7'){
        menu();
        option = prompt('\nInsira uma opção: ');
        switch(option){
            case '1':
                 await listAllCustomers();
                break;
            case '2': 
                await listAllRentals();
                break;
            case '3': 
                await listAllInventories();
                break;
            case '4': {
                console.log('\n Cadastro de Cliente: \n')
                await insertCustomer();
            }break;
            case '5':
                console.log('\n Cadastro de Aluguél de Filmes: \n')
                await insertRental();
                break;
            case '6': 
                console.log('\n Cadastro de Inventário: \n')
                await insertInventory();
                break;
            case '7': 
                console.log('Finalizando o sistema...')
                break;
            default: 
                console.log('Opção Inválida!')
            
        }
        prompt();
    }

}

main();
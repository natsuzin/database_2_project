const db = require("../../database/server");
const { listAllPeopleInJSON,  handleFilteredNameInput } = require("./person");
const prompt = require('prompt-sync')({sigint: true});

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

function menu(){
    console.log('\n=-=-=-=-=- MENU -=-=-=-=-=');
    console.log(`1. Listar tabela de 'Person'`);
    console.log(`2. Filtrar dados por nome`);
    console.log(`3. Sair do sistema`)
}

async function main(){
    let option = 0;
    while(option != 3){
        menu();
        option = prompt('\nInsira uma opção: ')
        switch(option){
            case '1':
                await listAllPeopleInJSON()
                break;
            case '2':
                await handleFilteredNameInput()
                break;
            case '3':
                console.log('Finalizando o sistema...')
                break;
            default:
                console.log('Opção Inválida!')
        }
        prompt('\nPressione enter para continuar...\n');
    }
}

main();
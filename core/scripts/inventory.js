const InventoryModel = require("../database/models/inventoryModel");
const FilmModel = require("../database/models/filmModel");
const StoreModel = require("../database/models/storeModel");

async function getAllInventories() { 
    try {
        const inventory = await InventoryModel.findAll({
            include: [
                {
                    model: FilmModel,
                    required: true
                },
                {
                    model: StoreModel,
                    required: true
                }
            ]
        });
        return inventory;
    } catch (err) {
       console.error(err);
       throw err; 
    }
}

async function createInventory(inventory) {
    try {
        const { filmId, storeId } = inventory;
        if (!isInteger(filmId) || !isInteger(storeId)) {
            throw new Error("Movie and store IDs must be integers");
        }
        const film = await FilmModel.findByPk(filmId);
        if (!film) {
            throw new Error("The movie doesn't exist.");
        }
        const store = await StoreModel.findByPk(storeId);
        if (!store) {
            throw new Error("The store doesn't exist.");
        }
        const newInventory = await InventoryModel.create(inventory)
        console.log(newInventory); //TO DO: retirar esse console depois
    } catch (err) {
        console.log(err);
        throw err;
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

async function insertInventory(){
    try{
        const inventory = {
            film_id: '',
            store_id: '',
        }
        inventory.film_id = prompt('ID do Filme: ');
        inventory.store_id = prompt('ID da Loja: ');
        console.log('inventário: ', inventory)
        createInventory(inventory)
    }catch(err){
        console.error(err)
        throw err;
    }
}

module.exports = { getAllInventories, createInventory, listAllInventories }
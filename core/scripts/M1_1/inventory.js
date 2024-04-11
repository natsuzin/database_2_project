const InventoryModel = require("../../database/models/inventoryModel");
const FilmModel = require("../../database/models/filmModel");
const StoreModel = require("../../database/models/storeModel");
const validationInputs = require("../../utils/validationInputs");

async function getAllInventories() { 
    try {
        const inventories = await InventoryModel.findAll({
            include: [
                {
                    model: FilmModel,
                    required: true
                },
                {
                    model: StoreModel,
                    required: true
                }
            ],
            limit:10 
        });
        return inventories;
    } catch (err) {
       console.error(err);
    }
}

async function createInventory(inventory) {
    try {
        const { film_id, store_id } = inventory;
        const film = await FilmModel.findByPk(film_id);
        if (!film) {
            console.log("The movie doesn't exist.");
        }
        const store = await StoreModel.findByPk(store_id);
        if (!store) {
            console.log("The store doesn't exist.");
        }
        await InventoryModel.create(inventory);
    } catch (err) {
        console.log(err);
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
        const inventory = {}
        inventory.film_id = validationInputs('ID do Filme: ', false);
        inventory.store_id = validationInputs('ID da Loja: ', false);
        console.log('\nInventário: ', inventory)
        await createInventory(inventory)
    }catch(err){
        console.error(err)
    }
}
module.exports = { getAllInventories, createInventory, listAllInventories, insertInventory }

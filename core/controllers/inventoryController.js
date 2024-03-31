const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "inventory"
const InventoryModel = require("../database/models/inventoryModel");
const FilmModel = require("../database/models/filmModel");
const StoreModel = require("../database/models/storeModel");

router.get('/', async (req, res) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = ['inventory']
    // #swagger.summary = 'Endpoint to get information of all inventory
    try {
        const inventory = await InventoryModel.findAll();
        res.json(inventory);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.post('/', async (req, res) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = ['inventory']
    // #swagger.summary = 'Endpoint to get information of all inventory
    try {
        const {filmId, storeId} = req.body;
        const film = await FilmModel.findByPk(filmId);
        if(!film){
            res.status(404).json({message: "The movie doesn´t exist."});
        }
        const store = await StoreModel.findByPk(storeId);
        if(!store){
        
            res.status(404).json({message: "The store doesn´t exist."});
        }
        const newInventory = await InventoryModel.create({
            film_id: filmId,
            store_id: storeId
        })
        res.send({newInventory});
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;
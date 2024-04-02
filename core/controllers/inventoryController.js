const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "inventory"
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

module.exports = { getAllInventories, createInventory }

/*
router.get('/noInclude', async (req, res) => {
    // #swagger.start
    // #swagger.tags = ['Inventory']
    // #swagger.path = ['/inventory/noInclude']
    // #swagger.summary = 'Endpoint to get information of inventory
    // #swagger.method = 'get'
    // #swagger.produces = ['application/json']
    // #swagger.end
    try {
        const inventory = await InventoryModel.findAll();
        res.status(201).json(inventory);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.get('/', async (req, res) => {
    // #swagger.start
    // #swagger.tags = ['Inventory']
    // #swagger.path = ['/inventory/']
    // #swagger.summary = 'Endpoint to get information of all inventory
    // #swagger.method = 'get'
    // #swagger.produces = ['application/json']
    // #swagger.end
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
        res.status(201).json(inventory);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.post('/', async (req, res) => {
    // #swagger.start
    // #swagger.tags = ['Inventory']
    // #swagger.path = ['/inventory/']
    // #swagger.summary = 'Endpoint to create an inventory
    // #swagger.method = 'post'
    // #swagger.end
    try {
        const { filmId, storeId } = req.body;
        if (!isInteger(filmId) || !isInteger(storeId)) {
            return res.status(400).json({ message: "Movie and store IDs must be integers" });
        }
        const film = await FilmModel.findByPk(filmId);
        if (!film) {
            res.status(404).json({ message: "The movie doesn´t exist." });
        }
        const store = await StoreModel.findByPk(storeId);
        if (!store) {
            res.status(404).json({ message: "The store doesn´t exist." });
        }
        const newInventory = await InventoryModel.create({
            film_id: filmId,
            store_id: storeId
        })
        res.send({ newInventory });
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;*/
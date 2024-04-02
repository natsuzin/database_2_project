const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "film"
const RentalModel = require("../database/models/rentalModel");
const InventoryModel = require("../database/models/inventoryModel");
const CustomerModel = require("../database/models/customerModel");
const StaffModel = require("../database/models/staffModel");

async function getAllRentals(){
    try {
        const rental = await RentalModel.findAll({
            // limit: 10,
            include: [
                {
                    model: InventoryModel,
                    required: true
                },
                {
                    model: CustomerModel,
                    required: true
                },
                {
                    model: StaffModel,
                    attributes: {
                        exclude: ["picture"]
                    },
                    required: true
                }
            ]
        });
        return rental;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function createRental(rental){
    try {
        const { inventoryId, customerId, staffId } = rental;
        if (!isInteger(inventoryId) || !isInteger(customerId) || !isInteger(staffId)) {
            throw new Error("Inventory, customer and staff IDs must be integers" );
        }
        const inventory = await InventoryModel.findByPk(inventoryId);
        if (!inventory) {
            throw new Error("The inventory doesn´t exist." );
        }
        const customer = await CustomerModel.findByPk(customerId);
        if (!customer) {
           throw new Error ("The customer doesn´t exist." );
        }
        const staff = await StaffModel.findByPk(staffId);
        if (!staff) {
            throw new Error ("The staff doesn´t exist." );
        }
        const newRental = await RentalModel.create(rental)
        console.log(newRental) // TO DO: retirar esse console depois
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { getAllRentals, createRental }
/*
router.get('/noInclude', async (req, res) => {
    try {
        const rental = await RentalModel.findAll();
        res.status(201).json(rental);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const rental = await RentalModel.findAll({
            // limit: 10,
            include: [
                {
                    model: InventoryModel,
                    required: true
                },
                {
                    model: CustomerModel,
                    required: true
                },
                {
                    model: StaffModel,
                    attributes: {
                        exclude: ["picture"]
                    },
                    required: true
                }
            ]
        });
        res.status(201).json(rental);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const { inventoryId, customerId, staffId } = req.body;
        if (!isInteger(inventoryId) || !isInteger(customerId) || !isInteger(staffId)) {
            return res.status(400).json({ message: "Inventory, customer and staff IDs must be integers" });
        }
        const inventory = await InventoryModel.findByPk(inventoryId);
        if (!inventory) {
            res.status(404).json({ message: "The inventory doesn´t exist." });
        }
        const customer = await CustomerModel.findByPk(customerId);
        if (!customer) {
            res.status
            (404).json({ message: "The customer doesn´t exist." });
        }
        const staff = await StaffModel.findByPk(staffId);
        if (!staff) {
            res.status(404).json({ message: "The staff doesn´t exist." });
        }
        const newRental = await RentalModel.create({
            inventory_id: inventoryId,
            customer_id: customerId,
            staff_id: staffId
        })
        res.send({ newRental });
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;*/
const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "rental"
const RentalModel = require("../database/models/rentalModel");
const InventoryModel = require("../database/models/inventoryModel");
const CustomerModel = require("../database/models/customerModel");
const StaffModel = require("../database/models/staffModel");

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
        const { rentalDate, returnDate, inventoryId, customerId, staffId } = req.body;
        if (!Number.isInteger(inventoryId) || !Number.isInteger(customerId) || !Number.isInteger(staffId)) {
            return res.status(400).json({ message: "Inventory, customer and staff IDs must be integers." });
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
            //rental_date: ,
            //return_date: ,
            inventory_id: inventoryId,
            customer_id: customerId,
            staff_id: staffId
        })
        res.send({ newRental });
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
});

module.exports = router;
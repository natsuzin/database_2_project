const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "film"
const RentalModel = require("../database/models/rentalModel");
const InventoryModel = require("../database/models/inventoryModel");
const CustomerModel = require("../database/models/customerModel");
const StaffModel = require("../database/models/staffModel");

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

module.exports = router;
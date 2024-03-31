const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "film"
const RentalModel = require("../database/models/rentalModel");

router.get('/', async (req, res) => {
    try {
        const rental = await RentalModel.findAll();
        res.json(rental);
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;
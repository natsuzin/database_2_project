const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "customer"
const CustomerModel = require("../database/models/customerModel");

router.get('/', async (req, res) => {
    try {
        const customer = await CustomerModel.findAll();
        res.json(customer);
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;
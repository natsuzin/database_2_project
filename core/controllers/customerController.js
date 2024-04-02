const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "customer"
const CustomerModel = require("../database/models/customerModel");
const StoreModel = require("../database/models/storeModel");
const AddressModel = require("../database/models/addressModel");

router.get('/noInclude', async (req, res) => {
    try {
        const customer = await CustomerModel.findAll();
        res.status(201).json(customer);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const customer = await CustomerModel.findAll({
            include: [
                {
                    model: StoreModel,
                    required: true
                },
                {
                    model: AddressModel,
                    required: true
                }
            ]
        });
        res.status(201).json(customer);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, addressId, storeId } = req.body;
        if (!Number.isInteger(addressId) || !Number.isInteger(storeId)) {
            return res.status(400).json({ message: "Address and store IDs must be integers" });
        }
        const address = await AddressModel.findByPk(addressId);
        if (!address) {
            res.status(404).json({ message: "The address doesn´t exist." });
        }
        const store = await StoreModel.findByPk(storeId);
        if (!store) {
            res.status(404).json({ message: "The store doesn´t exist." });
        }
        const newCustomer = await CustomerModel.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            address_id: addressId,
            store_id: storeId
        })
        res.send({ newCustomer });
    } catch (err) {
        console.log(err)
        res.status(401).json(err);
    }
});

module.exports = router;
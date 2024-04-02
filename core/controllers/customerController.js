const express = require("express");
const router = express.Router(); // 'router' -> cria rotas agindo como controlador de "customer"
const CustomerModel = require("../database/models/customerModel");
const StoreModel = require("../database/models/storeModel");
const AddressModel = require("../database/models/addressModel");

async function getAllCustomers() {
    try{
        const customers = await CustomerModel.findAll({
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
        })
        return customers
    } catch (err) {
       console.log(err);
       throw err;
    }
}

async function createCustomer(customer){
    try {
        const { address_id, store_id } = customer;
        if (!Number.isInteger(address_id) || !Number.isInteger(store_id)) {
            throw new Error ("Address and store IDs must be integers" );
        }
        const address = await AddressModel.findByPk(address_id);
        if (!address) {
            throw new Error ("The address doesn´t exist." );
        }
        const store = await StoreModel.findByPk(store_id);
        if (!store) {
            throw new Error( "The store doesn´t exist." );
        }

        await CustomerModel.create(customer)
    } catch (err) {
        console.log(err);
        throw err;
    }
}
module.exports = { getAllCustomers, createCustomer }

/*
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
        const { addressId, storeId } = req.body;
        if (!isInteger(addressId) || !isInteger(storeId)) {
            return res.status(400).json({ message: "Address and store IDs must be integers" });
        }
        const address = await AddressModel.findByPk(addressId);
        if (!film) {
            res.status(404).json({ message: "The address doesn´t exist." });
        }
        const store = await StoreModel.findByPk(storeId);
        if (!store) {
            res.status(404).json({ message: "The store doesn´t exist." });
        }
        const newInventory = await InventoryModel.create({
            address_id: addressId,
            store_id: storeId
        })
        res.send({ newCustomer });
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;


*/


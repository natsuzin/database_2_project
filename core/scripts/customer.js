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
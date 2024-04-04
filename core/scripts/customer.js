const CustomerModel = require("../database/models/customerModel");
const StoreModel = require("../database/models/storeModel");
const AddressModel = require("../database/models/addressModel");
const validationInputs = require("../utils/validationInputs");

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
            ],
            limit: 10 
        })
        return customers;
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

async function listAllCustomers(){
    try{
        const customers = await getAllCustomers()
        console.log('Customers: ')
        customers.forEach(customers => console.log(customers.toJSON()));
    }catch(err){
        console.log(err)
    }
}

async function insertCustomer(){
    try{
        const customer = {}
        customer.first_name = validationInputs('Nome: ');
        customer.last_name = validationInputs('Sobrenome: ');
        customer.email = validationInputs('Email: ');
        customer.address_id = validationInputs('ID Endereço: ', false);
        customer.store_id = validationInputs('ID Loja: ', false);
        console.log('\nCliente: ', customer)
        await createCustomer(customer)
    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports = { getAllCustomers, createCustomer, listAllCustomers, insertCustomer }
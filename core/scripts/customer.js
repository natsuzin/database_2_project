const CustomerModel = require("../database/models/customerModel");
const StoreModel = require("../database/models/storeModel");
const AddressModel = require("../database/models/addressModel");
const prompt = require('prompt-sync')({sigint: true});

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
        const customer = {
            store_id: '',
            email: '',
            address_id: '',
            active: ''
        }
        customer.first_name = prompt('Nome: ');
        customer.last_name = prompt('Sobrenome: ');
        customer.email = prompt('Email: ');
        customer.address_id = parseInt(prompt('ID Endereço: '));
        customer.store_id = parseInt(prompt('ID Loja: '));
        customer.active = prompt('Ativo (true/false): ') === 'true'
        console.log(customer)
        createCustomer(customer)
    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports = { getAllCustomers, createCustomer, listAllCustomers, insertCustomer }
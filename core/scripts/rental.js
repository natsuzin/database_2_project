const RentalModel = require("../database/models/rentalModel");
const InventoryModel = require("../database/models/inventoryModel");
const CustomerModel = require("../database/models/customerModel");
const StaffModel = require("../database/models/staffModel");
const prompt = require('prompt-sync')({sigint: true});

async function getAllRentals(){
    try {
        const rental = await RentalModel.findAll({
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
            ],
            limit: 10 
        });
        return rental;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function createRental(rental){
    try {
        const { inventory_id, customer_id, staff_id } = rental;
        if (!Number.isInteger(inventory_id) || !Number.isInteger(customer_id) || !Number.isInteger(staff_id)) {
            throw new Error("Inventory, customer and staff IDs must be integers" );
        }
        const inventory = await InventoryModel.findByPk(inventory_id);
        if (!inventory) {
            throw new Error("The inventory doesn´t exist." );
        }
        const customer = await CustomerModel.findByPk(customer_id);
        if (!customer) {
           throw new Error ("The customer doesn´t exist." );
        }
        const staff = await StaffModel.findByPk(staff_id);
        if (!staff) {
            throw new Error ("The staff doesn´t exist." );
        }
        await RentalModel.create(rental)
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function listAllRentals() {
    try{
        const rentals = await getAllRentals();
        console.log('Rentals: ')
        rentals.forEach(rentals => console.log(rentals.toJSON()));
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function insertRental(){
    try{
        const rental = {
            rental_date: '',
            inventory_id: '',
            customer_id: '',
            return_date: '',
            staff_id:'',
            last_update: '',
        }
        rental.rental_date = prompt('Data de aluguel: ');
        rental.inventory_id = parseInt(prompt('ID do Inventário: '));
        rental.customer_id = parseInt(prompt('ID do Cliente: '));
        rental.return_date = prompt('Data de retorno: ');
        rental.staff_id = parseInt(prompt('ID do Funcionário: '));
        rental.last_update = prompt('Última atualização: ');
        createRental(rental);
    }catch(err){
        throw err;
    }
}

module.exports = { getAllRentals, createRental, listAllRentals, insertRental }
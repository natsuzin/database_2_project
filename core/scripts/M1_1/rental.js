const RentalModel = require("../../database/models/rentalModel");
const InventoryModel = require("../../database/models/inventoryModel");
const CustomerModel = require("../../database/models/customerModel");
const StaffModel = require("../../database/models/staffModel");
const validationInputs = require("../../utils/validationInputs");

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
    }
}


async function createRental(rental){
    try {
        const { inventory_id, customer_id, staff_id } = rental;
        const inventory = await InventoryModel.findByPk(inventory_id);
        if (!inventory) {
            console.log ("The inventory doesn´t exist." );
        }
        const customer = await CustomerModel.findByPk(customer_id);
        if (!customer) {
            console.log  ("The customer doesn´t exist." );
        }
        const staff = await StaffModel.findByPk(staff_id);
        if (!staff) {
            console.log ("The staff doesn´t exist." );
        }
        console.log('RENTAL: ', rental),
        await RentalModel.create(rental)
    } catch (err) {
        console.error(err);
    }
}

async function listAllRentals() {
    try{
        const rentals = await getAllRentals();
        console.log('Rentals: ')
        rentals.forEach(rentals => console.log(rentals.toJSON()));
    }catch(err){
        console.log(err);
    }
}

async function insertRental(){
    try{
        const rental = {}
        rental.rental_date = validationInputs('Data de aluguel: '); // 2024-04-04T13:23:08.000Z
        rental.inventory_id = validationInputs('ID do Inventário: ', false);
        rental.customer_id = validationInputs('ID do Cliente: ', false);
        rental.return_date = validationInputs('Data de retorno: ');
        rental.staff_id = validationInputs('ID do Funcionário: ', false);
        await createRental(rental);
    }catch(err){
        console.log (err);
    }
}

module.exports = { getAllRentals, createRental, listAllRentals, insertRental }
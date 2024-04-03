const RentalModel = require("../database/models/rentalModel");
const InventoryModel = require("../database/models/inventoryModel");
const CustomerModel = require("../database/models/customerModel");
const StaffModel = require("../database/models/staffModel");

async function getAllRentals(){
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
        return rental;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function createRental(rental){
    try {
        const { inventoryId, customerId, staffId } = rental;
        if (!isInteger(inventoryId) || !isInteger(customerId) || !isInteger(staffId)) {
            throw new Error("Inventory, customer and staff IDs must be integers" );
        }
        const inventory = await InventoryModel.findByPk(inventoryId);
        if (!inventory) {
            throw new Error("The inventory doesn´t exist." );
        }
        const customer = await CustomerModel.findByPk(customerId);
        if (!customer) {
           throw new Error ("The customer doesn´t exist." );
        }
        const staff = await StaffModel.findByPk(staffId);
        if (!staff) {
            throw new Error ("The staff doesn´t exist." );
        }
        const newRental = await RentalModel.create(rental)
        console.log(newRental) // TO DO: retirar esse console depois
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
        console.log(err)
    }
}


module.exports = { getAllRentals, createRental, listAllRentals }
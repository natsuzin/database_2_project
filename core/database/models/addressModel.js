// addressModel -> página para inserção de todas as colunas da tabela "address"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');

const Address = sequelize.define('Address', {
    address_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address2: {
        type: DataTypes.STRING(50),
        defaultValue: null
    },
    district: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    city_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING(10),
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        onUpdate: new Date()
    }
}, {
    tableName: 'address',
    timestamps: false 
});

module.exports = Address;
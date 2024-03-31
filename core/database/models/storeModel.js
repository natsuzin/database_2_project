// storeModel -> página para inserção de todas as colunas da tabela "store"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');

const Store = sequelize.define('Store', {
    store_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    manager_staff_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        unique: true
    },
    address_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        onUpdate: new Date()
    }
}, {
    tableName: 'store',
    timestamps: false
});

module.exports = Store;
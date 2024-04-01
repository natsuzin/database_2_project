// staffModel -> página para inserção de todas as colunas da tabela "staff"

const sequelize = require("../server");
const { Sequelize, DataTypes } = require('sequelize');

const Staff = sequelize.define('Staff', {
    staff_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    address_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    picture: {
        type: DataTypes.BLOB,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING(50),
        defaultValue: null
    },
    store_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    username: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(40),
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        defaultValue: null
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        onUpdate: new Date()
    }
}, {
    tableName: 'staff',
    timestamps: false
});

module.exports = Staff;
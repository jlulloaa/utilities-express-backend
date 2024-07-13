import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Customers = sequelize.define('Customers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FirstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    StreetName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    StreetNumber: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    Unit: {
        type: DataTypes.STRING(50)
    },
    Town: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    City: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    State: {
        type: DataTypes.STRING(100)
    },
    Country: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    PostalCode: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Customers',
    timestamps: true
});

export default Customers;
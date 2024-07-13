import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Customers from './customers.js';
import Providers from './providers.js';
import Utilities from './utilities.js';
import Meters from './meters.js';

// To avoid Sequelize automatically pluralizing the model name and 
// using it as the table name, specify the tableName option in the 
// model definition options.

const CustomerProviderUtility = sequelize.define('CustomerProviderUtility', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CustomerID: {
        type: DataTypes.INTEGER,
        references: {
            model: Customers,
            key: 'id'
        }
    },
    ProviderID: {
        type: DataTypes.INTEGER,
        references: {
            model: Providers,
            key: 'id'
        }
    },
    UtilityID: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilities,
            key: 'id'
        }
    },
    MeterID: {
        type: DataTypes.INTEGER,
        references: {
            model: Meters,
            key: 'id'
        }
    },
    CustomerNumber: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'CustomerProviderUtility',
    timestamps: true
});

export default CustomerProviderUtility;
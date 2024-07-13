import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Utilities from './utilities.js';

const Providers = sequelize.define('Providers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UtilityID: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilities,
            key: 'id'
        }
    },
    ProviderName: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'Providers',
    timestamps: true
});

export default Providers;
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Utilities from './utilities.js';

const Meters = sequelize.define('Meters', {
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
    SerialNro: {
        type: DataTypes.STRING(200)
    }
}, {
    tableName: 'Meters',
    timestamps: true
});

export default Meters;
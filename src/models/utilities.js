/**
 * Defining a schema is not strictly necessary for creating middleware functions to connect the frontend with the backend. 
 * However, using a schema can provide several benefits, such as ensuring data integrity, simplifying validation, and improving code maintainability.
 * A schema can be defined by either: 
 *  1) Using a validation library like Joi for validating request data
 *  2) Using an ORM (Object-Relational Mapping) library like Sequelize for managing database models.
 * I choose option 2, use sequelize to manage the db model
 */
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Utilities = sequelize.define('Utilities', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UtilityName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    UtilityUnits: {
        type: DataTypes.STRING(20)
    }
}, {
    tableName: 'Utilities',
    timestamps: true
});

export default Utilities;
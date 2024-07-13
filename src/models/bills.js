import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import CustomerProviderUtility from './customerproviderutility.js';

const Bills = sequelize.define('Bills', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CustomerProviderUtilityID: {
        type: DataTypes.INTEGER,
        references: {
            model: CustomerProviderUtility,
            key: 'id'
        }
    },
    IssueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    AmountBilled: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    AmountConsumed: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    PaymentDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    PaymentDate: {
        type: DataTypes.DATE
    },
    Status: {
        type: DataTypes.ENUM('Paid', 'Unpaid', 'Sumario'),
        defaultValue: 'Unpaid'
    },
    StartPeriod: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndPeriod: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Bills',
    timestamps: true
});

export default Bills;
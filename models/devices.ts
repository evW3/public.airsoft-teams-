import { sequelize, DataTypes } from '../utils/BaseDB';

const Devices = sequelize.define('devices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ip: {
        type: DataTypes.STRING
    },
    browser: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { Devices };
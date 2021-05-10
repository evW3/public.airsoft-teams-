import { sequelize, DataTypes } from '../utils/BaseDB';
import { IDevices } from "../utils/interfaces";

const Devices = sequelize.define<IDevices>("devices", {
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
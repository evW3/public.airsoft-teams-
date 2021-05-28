import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { IPermissions } from "../utils/interfaces";

const Permissions = sequelize.define<IPermissions>("permissions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { Permissions };
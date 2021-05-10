import { sequelize, DataTypes } from '../utils/BaseDB';
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
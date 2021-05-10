import { sequelize, DataTypes } from '../utils/BaseDB';
import { IRoles } from "../utils/interfaces";

const Roles = sequelize.define<IRoles>("roles",{
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

export { Roles };
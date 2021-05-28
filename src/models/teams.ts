import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { ITeams } from "../utils/interfaces";

const Teams = sequelize.define<ITeams>("teams",{
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

export { Teams };
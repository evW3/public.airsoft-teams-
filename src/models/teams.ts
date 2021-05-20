import { sequelize, DataTypes } from '../utils/BaseDB';
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
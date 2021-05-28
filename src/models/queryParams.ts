import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { IQueryParams } from "../utils/interfaces";

const QueryParams = sequelize.define<IQueryParams>("query_params", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parameter: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { QueryParams };
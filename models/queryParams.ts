import {DataTypes, sequelize} from "../utils/BaseDB";
import { IQueryParams } from "../utils/interfaces";

const QueryParams = sequelize.define<IQueryParams>("query-params", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parameters: {
        type: DataTypes.JSON
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { QueryParams };
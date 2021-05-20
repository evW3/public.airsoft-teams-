import {DataTypes, sequelize} from "../utils/BaseDB";
import {IQueries} from "../utils/interfaces";
import { statuses, queryTypes } from "../utils/enums";

const Queries = sequelize.define<IQueries>("queries", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM,
        values: [queryTypes.CHANGE_ROLE, queryTypes.ENTER_TEAM],
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: [statuses.ACCEPTED, statuses.DECLINE, statuses.PROCESSED],
        defaultValue: statuses.PROCESSED,
        allowNull: false
    },
    parameters: {
        type: DataTypes.JSON
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { Queries };
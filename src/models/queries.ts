import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { IQueries } from "../utils/interfaces";
import { queryTypes, statuses } from "../utils/enums";

const Queries = sequelize.define<IQueries>("queries", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM,
        values: [queryTypes.CHANGE_ROLE, queryTypes.JOIN_TEAM, queryTypes.EXIT_FROM_TEAM, queryTypes.MOVE_TO_ANOTHER_TEAM],
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: [statuses.ACCEPTED, statuses.DECLINE, statuses.PROCESSED],
        defaultValue: statuses.PROCESSED,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { Queries };
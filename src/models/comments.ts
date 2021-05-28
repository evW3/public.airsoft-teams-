import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { IComments } from "../utils/interfaces";

const Comments = sequelize.define<IComments>("comments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { Comments };
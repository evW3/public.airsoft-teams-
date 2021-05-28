import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { IBlockList } from "../utils/interfaces";

const BlockList = sequelize.define<IBlockList>("block_list", {
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

export { BlockList };
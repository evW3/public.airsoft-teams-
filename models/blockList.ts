import { sequelize, DataTypes } from '../utils/BaseDB';
import { IBlockList } from "../utils/interfaces";
import { Users, Comments } from "./relations";

const BlockList = sequelize.define<IBlockList>("block-list", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    commentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Comments,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { BlockList };
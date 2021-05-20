import { sequelize, DataTypes } from '../utils/BaseDB';
import { IQueriesComments } from "../utils/interfaces";
import { Queries, Comments } from "./relations";

const QueriesComments = sequelize.define<IQueriesComments>("queries_comments", {
    queryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Queries,
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

export { QueriesComments };
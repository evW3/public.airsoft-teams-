import { sequelize, DataTypes } from '../utils/BaseDB';
import { ITeamMembers } from "../utils/interfaces";
import { Users, Teams} from "./relations";

const TeamMembers = sequelize.define<ITeamMembers>("team-members",{
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    teamId: {
        type: DataTypes.INTEGER,
        references: {
            model: Teams,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { TeamMembers };
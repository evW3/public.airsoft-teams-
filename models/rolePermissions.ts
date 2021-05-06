import { sequelize, DataTypes } from '../utils/BaseDB'
import { Roles } from "./roles";
import { Permissions } from "./permissions";

const RolePermissions = sequelize.define('role-permissions', {
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Roles,
            key: 'id'
        }
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permissions,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { RolePermissions };
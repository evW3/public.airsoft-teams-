import { DataTypes } from 'sequelize';
import { sequelize } from "./index";
import { Roles } from "./roles";
import { Permissions } from "./permissions";
import { IRolePermissions } from "../utils/interfaces";

const RolePermissions = sequelize.define<IRolePermissions>("role_permissions",{
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
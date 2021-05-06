import { Users } from './users';
import { Roles } from './roles';
import { Devices } from './devices';
import { VerificationCodes } from './verificationCodes';
import { Permissions } from "./permissions";
import { RolePermissions } from "./rolePermissions";

Roles.hasOne(Users);
Users.belongsTo(Roles);

Users.hasMany(Devices, { onDelete: 'cascade' });
Devices.belongsTo(Users);

Users.hasMany(VerificationCodes, { onDelete: 'cascade' });
VerificationCodes.belongsTo(Users);

Roles.belongsToMany(Permissions, { through: RolePermissions, onDelete: 'cascade' });
Permissions.belongsToMany(Roles, { through: RolePermissions, onDelete: 'cascade' });

export {
    Users,
    Roles,
    Devices,
    VerificationCodes,
    Permissions,
    RolePermissions
};
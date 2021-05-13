import { Users } from './users';
import { Roles } from './roles';
import { Devices } from './devices';
import { VerificationCodes } from './verificationCodes';
import { Permissions } from "./permissions";
import { RolePermissions } from "./rolePermissions";
import { Queries } from "./queries";
import { Comments } from "./comments";
import { Teams } from "./teams";

Roles.hasOne(Users);
Users.belongsTo(Roles);

Teams.hasMany(Users);
Users.belongsTo(Teams);

Users.hasMany(Devices, { onDelete: 'cascade' });
Devices.belongsTo(Users);

Users.hasMany(VerificationCodes, { onDelete: 'cascade' });
VerificationCodes.belongsTo(Users);

Roles.belongsToMany(Permissions, { through: RolePermissions, onDelete: 'cascade' });
Permissions.belongsToMany(Roles, { through: RolePermissions, onDelete: 'cascade' });

Users.hasMany(Queries);
Queries.belongsTo(Users);

Queries.hasOne(Comments);
Comments.belongsTo(Queries);

export {
    Users,
    Roles,
    Devices,
    VerificationCodes,
    Permissions,
    RolePermissions,
    Queries,
    Teams
};
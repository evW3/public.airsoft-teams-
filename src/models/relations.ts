import { Users } from './users';
import { Roles } from './roles';
import { Devices } from './devices';
import { VerificationCodes } from './verificationCodes';
import { Permissions } from "./permissions";
import { RolePermissions } from "./rolePermissions";
import { Queries } from "./queries";
import { Comments } from "./comments";
import { Teams } from "./teams";
import { QueriesComments } from "./queriesComments"
import { BlockList } from "./blockList";
import { QueryParams } from "./queryParams";

Roles.hasOne(Users);
Users.belongsTo(Roles);

Teams.hasMany(Users);
Users.belongsTo(Teams);

Users.hasMany(Devices, { onDelete: 'cascade' });
Devices.belongsTo(Users);

Users.hasMany(VerificationCodes, { onDelete: 'cascade' });
VerificationCodes.belongsTo(Users);

Users.hasMany(Queries);
Queries.belongsTo(Users);

Users.hasOne(BlockList, { onDelete: 'cascade' });
BlockList.belongsTo(Users);

Queries.hasOne(QueryParams);
QueryParams.belongsTo(Queries);

Roles.belongsToMany(Permissions, { through: RolePermissions, onDelete: 'cascade' });
Permissions.belongsToMany(Roles, { through: RolePermissions, onDelete: 'cascade' });

Queries.belongsToMany(Comments, { through: QueriesComments, onDelete: 'cascade' });
Comments.belongsToMany(Queries, { through: QueriesComments, onDelete: 'cascade' });

export {
    Users,
    Roles,
    Devices,
    VerificationCodes,
    Permissions,
    RolePermissions,
    Queries,
    Teams,
    Comments,
    QueriesComments,
    BlockList,
    QueryParams
};
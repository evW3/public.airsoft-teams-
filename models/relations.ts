import { Users } from './users';
import { Roles } from './roles';
import { Devices } from './devices';
import { VerificationCodes } from './verificationCodes';

Roles.hasOne(Users);
Users.belongsTo(Roles);

Users.hasMany(Devices);
Devices.belongsTo(Users);

Users.hasMany(VerificationCodes);
VerificationCodes.belongsTo(Users);

export {
    Users,
    Roles,
    Devices,
    VerificationCodes,
};
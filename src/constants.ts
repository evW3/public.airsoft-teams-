import {IKeyValue, IObjectWithName} from "./utils/interfaces";
import * as config from "config";
import {Permissions} from "./models/permissions";
import { IRolesPermission } from "./utils/interfaces";

const url: string = config.get('url');

export const uploads: string = `${ url }/uploads`;

export const PermissionsList: IKeyValue = {
    activateManager: [ 'ADMIN' ],
    getManagers: [ 'ADMIN' ],
    getManagerById: [ 'ADMIN' ],
    blockManager: [ 'ADMIN' ],
    unblockManager: [ 'ADMIN' ],
    declineManager: [ 'ADMIN' ],
    registerTeam: [ 'ADMIN' ]
}

export function getListPermissions(PermissionsList: IKeyValue): IObjectWithName[] {
    let permissionNames: IObjectWithName[] = [];
    Object.keys(PermissionsList).forEach(key => permissionNames.push({ name: key }));
    return permissionNames;
}

// export function getListRolePermissions(PermissionsList: IKeyValue) {
//     let rolePermissions: IRolesPermission[] = [];
//
//     Object.values(PermissionsList).forEach( roleName =>
//         roleName === "ADMIN" ? rolePermissions.push({ roleId: 1, permissionId: i.id }) :
//             roleName === "MANAGER" ? rolePermissions.push({ roleId: 2, permissionId: i.id }) :
//                 rolePermissions.push({ roleId: 3, permissionId: i.id })
//     )
// }
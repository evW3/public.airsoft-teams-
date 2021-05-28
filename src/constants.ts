import {IKeyValue, IObjectWithName, IRoles} from "./utils/interfaces";
import config from "config";
import { IPermissions } from "./utils/interfaces";

const url: string = config.get('url');

export const uploads: string = `${ url }/uploads`;

export const PermissionsList: IKeyValue = {
    activateManager: [ 'ADMIN' ],
    getManagers: [ 'ADMIN' ],
    getManagerById: [ 'ADMIN' ],
    blockManager: [ 'ADMIN' ],
    unblockManager: [ 'ADMIN' ],
    declineManager: [ 'ADMIN' ],
    registerTeam: [ 'ADMIN' ],
    moveUserFromTeam: [ 'ADMIN', 'MANAGER' ],
    acceptJoinTeam: [ 'ADMIN', 'MANAGER' ],
    declineJoinTeam: [ 'ADMIN', 'MANAGER' ],
    getPlayerById: [ 'ADMIN', 'MANAGER', 'PLAYER' ],
    getTeamMembers: [ 'ADMIN', 'MANAGER', 'PLAYER' ],
    getPlayersWhoIntoTeam: [ 'ADMIN', 'MANAGER', 'PLAYER' ],
    acceptExitTeam: [ 'ADMIN', 'MANAGER' ],
    declineExitTeam: [ 'ADMIN', 'MANAGER', 'PLAYER' ],
    unblockPlayer: ['ADMIN', 'MANAGER' ],
    blockPlayer: ['ADMIN', 'MANAGER' ],
    changeRole: ['PLAYER'],
    exitTeam: ['PLAYER'],
    joinTeam: ['PLAYER'],
    getQueries: ['ADMIN', 'MANAGER' ]
}

export function getListPermissions(PermissionsList: IKeyValue): IObjectWithName[] {
    let permissionNames: IObjectWithName[] = [];
    Object.keys(PermissionsList).forEach(key => permissionNames.push({ name: key }));
    return permissionNames;
}

function findRoleIndex(roleName: string, roles: object[]): number {
    let id: number = 0;
    roles.forEach(
        (item: any) => item.name === roleName ? id = item.id : null )
    return id;
}

export function getListRolesPermissions(PermissionsList: IKeyValue, permissions: IPermissions[], roles: IRoles[]) {
    type rolePermission = {
        roleId: number,
        permissionId: number
    }
    let rolePermissions: rolePermission[] = [];

    let adminIdx: number = findRoleIndex("ADMIN", roles);
    let managerIdx: number = findRoleIndex("MANAGER", roles);
    let playerIdx: number = findRoleIndex("PLAYER", roles);

    for(const i of permissions) {
        PermissionsList[i.name].forEach( roleName =>
            roleName === "ADMIN" ? rolePermissions.push({ roleId: adminIdx, permissionId: i.id }) :
                roleName === "MANAGER" ? rolePermissions.push({ roleId: managerIdx, permissionId: i.id }) :
                    rolePermissions.push({ roleId: playerIdx, permissionId: i.id })
        )
    }
    return rolePermissions;
}
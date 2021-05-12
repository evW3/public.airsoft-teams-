import { IKeyValue, IRolesConstant } from "./utils/interfaces";

export const ROLES: IRolesConstant = { PLAYER: "PLAYER", MANAGER: "MANAGER" };

export const PermissionsList: IKeyValue = {
    activateManager: [ 'ADMIN' ],
    getManagers: [ 'ADMIN' ]
}
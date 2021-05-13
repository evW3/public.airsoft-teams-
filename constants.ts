import { IKeyValue, IRolesConstant } from "./utils/interfaces";
import config from "config";
const url: string = config.get('url');

export const ROLES: IRolesConstant = { PLAYER: "PLAYER", MANAGER: "MANAGER" };

export const uploads: string = `${ url }/uploads`;

export const PermissionsList: IKeyValue = {
    activateManager: [ 'ADMIN' ],
    getManagers: [ 'ADMIN' ],
    getDefaultProfile: [ 'ADMIN', 'MANAGER' ],
    getPlayerProfile: [ 'PLAYER' ]
}
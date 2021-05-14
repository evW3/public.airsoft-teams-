import { IKeyValue, IRolesConstant } from "./utils/interfaces";
import config from "config";

const url: string = config.get('url');

export const uploads: string = `${ url }/uploads`;

export const PermissionsList: IKeyValue = {
    activateManager: [ 'ADMIN' ],
    getManagers: [ 'ADMIN' ],
    getManagerById: [ 'ADMIN' ],
    registerTeam: [ 'ADMIN' ]
}
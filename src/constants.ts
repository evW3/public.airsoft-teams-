import { IKeyValue } from "./utils/interfaces";
import * as config from "config";

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
import * as express from 'express';

import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { getUserIdByQuery, isQueryExists } from "../middleware/queries";
import { queryTypes, userRoles } from "../utils/enums";
import { checkUserRole, checkDescription } from "../middleware/global";
import {
    parseManagerId,
    getIdFromParams,
    blockManagerVerify,
    unblockManagerVerify
} from "../middleware/managers";
import {
    acceptManager,
    declineManager,
    getManagers,
    getManagerById,
    blockManager,
    unblockManager
} from "../controllers/managers";

const managerRoute = express.Router();

managerRoute.patch(
    "/accept-manager",
    verify,
    checkPermission.bind({ permission: 'activateManager' }),
    getUserIdByQuery,
    isQueryExists.bind({ queryType: queryTypes.CHANGE_ROLE }),
    acceptManager
);

managerRoute.patch(
    "/decline-manager",
    verify,
    checkPermission.bind({ permission: 'declineManager' }),
    getUserIdByQuery,
    checkDescription,
    isQueryExists.bind({ queryType: queryTypes.CHANGE_ROLE }),
    declineManager
);

managerRoute.get(
    "/",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    getManagers
);

managerRoute.get(
    "/:id",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    getIdFromParams,
    checkUserRole.bind({ roleName: userRoles.MANAGER }),
    getManagerById
);

managerRoute.post(
    "/block",
    verify,
    checkPermission.bind({ permission: 'blockManager' }),
    parseManagerId,
    checkUserRole.bind({ roleName: userRoles.MANAGER }),
    blockManagerVerify,
    checkDescription,
    blockManager
)

managerRoute.delete(
    "/unblock",
    verify,
    checkPermission.bind({ permission: 'unblockManager' }),
    parseManagerId,
    checkUserRole.bind({ roleName: userRoles.MANAGER }),
    unblockManagerVerify,
    checkDescription,
    unblockManager
)

export { managerRoute };
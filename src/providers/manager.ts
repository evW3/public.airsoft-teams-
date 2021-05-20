import * as express from 'express';

import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import {
    acceptManager,
    declineManager,
    getManagers,
    getManagerById,
    blockManager,
    unblockManager
} from "../controllers/managers";
import { changeRoleQueryVerify } from "../middleware/queries";
import { checkManagerRole, getIdFromParams, blockManagerVerify, unblockManagerVerify } from "../middleware/managers";

const managerRoute = express.Router();

managerRoute.patch(
    "/accept-manager",
    verify,
    checkPermission.bind({ permission: 'activateManager' }),
    changeRoleQueryVerify,
    acceptManager
);

managerRoute.patch(
    "/decline-manager",
    verify,
    checkPermission.bind({ permission: 'declineManager' }),
    changeRoleQueryVerify,
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
    checkManagerRole,
    getManagerById
);

managerRoute.post(
    "/block",
    verify,
    checkPermission.bind({ permission: 'blockManager' }),
    checkManagerRole,
    blockManagerVerify,
    blockManager
)

managerRoute.delete(
    "/unblock",
    verify,
    checkPermission.bind({ permission: 'unblockManager' }),
    checkManagerRole,
    unblockManagerVerify,
    unblockManager
)

export { managerRoute };
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
import { getUserIdByQuery } from "../middleware/queries";
import {
    checkManagerRole,
    getIdFromParams,
    blockManagerVerify,
    unblockManagerVerify,
    isQueryExists
} from "../middleware/managers";
import {queryTypes} from "../utils/enums";
import {checkDescription} from "../middleware/players";

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
    checkManagerRole,
    getManagerById
);

managerRoute.post(
    "/block",
    verify,
    checkPermission.bind({ permission: 'blockManager' }),
    checkManagerRole,
    blockManagerVerify,
    checkDescription,
    blockManager
)

managerRoute.delete(
    "/unblock",
    verify,
    checkPermission.bind({ permission: 'unblockManager' }),
    checkManagerRole,
    unblockManagerVerify,
    checkDescription,
    unblockManager
)

export { managerRoute };
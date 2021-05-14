import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { activateManager, getManagers, getManagerById } from "../controllers/managers";
import { changeRoleQueryVerify } from "../middleware/queries";
import { checkManagerRole } from "../middleware/managers";

const managerRoute = express.Router();

managerRoute.post(
    "/accept-manager",
    verify,
    checkPermission.bind({ permission: 'activateManager' }),
    changeRoleQueryVerify,
    activateManager
);

managerRoute.get(
    "/managers",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    getManagers
);

managerRoute.get(
    "/managers/:id",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    checkManagerRole,
    getManagerById
);

export { managerRoute };
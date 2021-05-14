import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { activateManager, getManagersInfo } from "../controllers/managers";

const managerRoute = express.Router();

managerRoute.post(
    "/activate-manager",
    verify,
    checkPermission.bind({ permission: 'activateManager' }),
    activateManager
);

managerRoute.get(
    "/managers",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    getManagersInfo
);

managerRoute.get(
    "/managers/:id",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    getManagersInfo
);

export { managerRoute };
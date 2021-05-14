import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { activateManager, getManagersInfo } from "../controllers/managers";
import { changeRoleQueryVerify } from "../middleware/queries";

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
    getManagersInfo
);

managerRoute.get(
    "/managers/:id",
    verify,
    checkPermission.bind({ permission: 'getManagers' }),
    getManagersInfo
);

export { managerRoute };
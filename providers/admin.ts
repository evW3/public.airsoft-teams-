import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { activateManager, getManagersInfo } from "../controllers/admin";

const adminRoute = express.Router();

adminRoute.post("/activate-manager", verify, checkPermission.bind({ permission: 'activateManager' }), activateManager);
adminRoute.get("/managers", verify, checkPermission.bind({ permission: 'getManagers' }), getManagersInfo);
adminRoute.get("/managers/:id", verify, checkPermission.bind({ permission: 'getManagers' }), getManagersInfo);

export { adminRoute };
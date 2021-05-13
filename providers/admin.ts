import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { activateManager, getManagersInfo, createTeam } from "../controllers/admin";

const adminRoute = express.Router();

adminRoute.post("/activate-manager", verify, checkPermission.bind({ permission: 'activateManager' }), activateManager);

adminRoute.get("/managers", verify, checkPermission.bind({ permission: 'getManagers' }), getManagersInfo);
adminRoute.get("/managers/:id", verify, checkPermission.bind({ permission: 'getManagers' }), getManagersInfo);

adminRoute.put("/teams", verify, checkPermission.bind({ permission: 'createTeam' }), createTeam);

export { adminRoute };
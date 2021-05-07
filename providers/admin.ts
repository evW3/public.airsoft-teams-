import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { activateManager, getManagersInfo } from "../controllers/admin";

const adminRoute = express.Router();

adminRoute.post("/activate-manager", verify, checkPermission, activateManager);
adminRoute.get("/managers", verify, checkPermission, getManagersInfo);
adminRoute.get("/managers/:id", verify, checkPermission, getManagersInfo);

export { adminRoute };



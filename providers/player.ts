import express from 'express';
import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { getPlayerProfile } from "../controllers/player";

const playerRoute = express.Router();

playerRoute.get("/profile", verify, checkPermission.bind({ permission: 'getPlayerProfile' }), getPlayerProfile);

export { playerRoute };
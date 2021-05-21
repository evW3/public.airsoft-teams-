import * as express from 'express';

import { acceptJoinTeam } from "../controllers/players";
import { verify } from "../middleware/token";
import { getPlayerIdByQueryId, isExistsQueryVerify } from "../middleware/players";
import { checkPermission } from "../middleware/protected";
const playerRoute = express.Router();

playerRoute.post(
    "/accept-join-team",
    verify,
    checkPermission.bind({ permission: 'acceptJoinTeam' }),
    getPlayerIdByQueryId,
    isExistsQueryVerify,
    acceptJoinTeam
);

playerRoute.post(
  "/decline-join-team",
    verify,
    checkPermission.bind({ permission: 'declineJoinTeam' }),
);

export { playerRoute };
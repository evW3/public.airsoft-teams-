import * as express from 'express';

import { acceptJoinTeam, declineJoinTeam } from "../controllers/players";
import { verify } from "../middleware/token";
import {checkDescription, getPlayerIdByQueryId, isExistsQueryVerify} from "../middleware/players";
import { checkPermission } from "../middleware/protected";
import { queryTypes } from "../utils/enums";

const playerRoute = express.Router();

playerRoute.post(
    "/accept-join-team",
    verify,
    checkPermission.bind({ permission: 'acceptJoinTeam' }),
    getPlayerIdByQueryId,
    isExistsQueryVerify.bind({ queryType: queryTypes.JOIN_TEAM }),
    acceptJoinTeam
);

playerRoute.post(
  "/decline-join-team",
    verify,
    checkPermission.bind({ permission: 'declineJoinTeam' }),
    getPlayerIdByQueryId,
    isExistsQueryVerify.bind({ queryType: queryTypes.JOIN_TEAM }),
    checkDescription,
    declineJoinTeam
);

playerRoute.post(
    "/"
);

export { playerRoute };
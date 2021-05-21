import * as express from 'express';

import {
    acceptExitFromTeam,
    acceptJoinTeam,
    declineExitFromTeam,
    declineJoinTeam,
    removePlayerFromTeam
} from "../controllers/players";
import { verify } from "../middleware/token";
import {checkDescription, getPlayerIdByQueryId, isExistsQueryVerify} from "../middleware/players";
import { checkPermission } from "../middleware/protected";
import { queryTypes } from "../utils/enums";
import {getUsersInTeam} from "../services/users";

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
    "/accept-exit-team",
    verify,
    checkPermission.bind({ permission: 'acceptExitTeam' }),
    getPlayerIdByQueryId,
    isExistsQueryVerify.bind({ queryType: queryTypes.EXIT_FROM_TEAM }),
    acceptExitFromTeam
);

playerRoute.post(
    "/decline-exit-team",
    verify,
    checkPermission.bind({ permission: 'acceptExitTeam' }),
    getPlayerIdByQueryId,
    isExistsQueryVerify.bind({ queryType: queryTypes.EXIT_FROM_TEAM }),
    declineExitFromTeam
);

playerRoute.delete(
    "/move-user",
    verify,
    checkPermission.bind({ permission: 'moveUserFromTeam' }),
    checkDescription,
    removePlayerFromTeam
);

playerRoute.get(
    "/",
    verify,
    getUsersInTeam
)

export { playerRoute };
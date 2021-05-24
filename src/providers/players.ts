import * as express from 'express';

import { checkPermission } from "../middleware/protected";
import { queryTypes } from "../utils/enums";
import { getIdFromParams } from "../middleware/managers";
import {getUserIdByQuery, isPlayerInTeamVerify, isQueryExists} from "../middleware/queries";
import { checkUserRole, checkDescription } from "../middleware/global";
import { verify } from "../middleware/token";
import {
    acceptExitFromTeam,
    acceptJoinTeam,
    blockPlayer,
    declineExitFromTeam,
    declineJoinTeam,
    getPlayerById,
    removePlayerFromTeam,
    unBlockPlayer
} from "../controllers/players";
import {
    parsePlayerId,
    isNotUserInBlockList,
    isTheSamePlayer,
    isUserInBlockList,
} from "../middleware/players";

const playerRoute = express.Router();

playerRoute.post(
    "/accept-join-team",
    verify,
    checkPermission.bind({ permission: 'acceptJoinTeam' }),
    getUserIdByQuery,
    isQueryExists.bind({ queryType: queryTypes.JOIN_TEAM }),
    acceptJoinTeam
);

playerRoute.post(
  "/decline-join-team",
    verify,
    checkPermission.bind({ permission: 'declineJoinTeam' }),
    getUserIdByQuery,
    isQueryExists.bind({ queryType: queryTypes.JOIN_TEAM }),
    checkDescription,
    declineJoinTeam
);

playerRoute.post(
    "/accept-exit-team",
    verify,
    checkPermission.bind({ permission: 'acceptExitTeam' }),
    getUserIdByQuery,
    isQueryExists.bind({ queryType: queryTypes.EXIT_FROM_TEAM }),
    acceptExitFromTeam
);

playerRoute.post(
    "/decline-exit-team",
    verify,
    checkPermission.bind({ permission: 'declineExitTeam' }),
    getUserIdByQuery,
    isTheSamePlayer,
    isQueryExists.bind({ queryType: queryTypes.EXIT_FROM_TEAM }),
    declineExitFromTeam
);

playerRoute.delete(
    "/move-user",
    verify,
    checkPermission.bind({ permission: 'moveUserFromTeam' }),
    checkDescription,
    parsePlayerId,
    isPlayerInTeamVerify,
    removePlayerFromTeam
);

playerRoute.get(
    "/:id",
    verify,
    checkPermission.bind({ permission: 'getPlayerById' }),
    getIdFromParams,
    getPlayerById
)

playerRoute.post(
    "/block",
    verify,
    checkPermission.bind({ permission: 'blockPlayer' }),
    parsePlayerId,
    checkUserRole,
    isNotUserInBlockList,
    checkDescription,
    blockPlayer
)

playerRoute.delete(
    "/unblock",
    verify,
    checkPermission.bind({ permission: 'unblockPlayer' }),
    parsePlayerId,
    checkUserRole,
    isUserInBlockList,
    checkDescription,
    unBlockPlayer
)

export { playerRoute };
import * as express from 'express';

import {
    acceptExitFromTeam,
    acceptJoinTeam, blockPlayer,
    declineExitFromTeam,
    declineJoinTeam, getPlayerById,
    removePlayerFromTeam, unBlockPlayer
} from "../controllers/players";
import { verify } from "../middleware/token";
import {
    checkDescription,
    checkPlayerRole,
    getPlayerIdByQueryId,
    isExistsQueryVerify, isNotUserInBlockList,
    isTheSamePlayer, isUserInBlockList, playerConcatenateId
} from "../middleware/players";
import { checkPermission } from "../middleware/protected";
import { queryTypes } from "../utils/enums";
import { getIdFromParams } from "../middleware/managers";

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
    checkPermission.bind({ permission: 'declineExitTeam' }),
    getPlayerIdByQueryId,
    isTheSamePlayer,
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
    checkPlayerRole,
    playerConcatenateId,
    isNotUserInBlockList,
    checkDescription,
    blockPlayer
)

playerRoute.post(
    "/unblock",
    verify,
    checkPermission.bind({ permission: 'unblockPlayer' }),
    checkPlayerRole,
    playerConcatenateId,
    isUserInBlockList,
    checkDescription,
    unBlockPlayer
)

export { playerRoute };
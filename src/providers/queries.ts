import * as express from "express";

import { verify } from "../middleware/token";
import { isPlayerInTeamVerify, checkQueryExists, isExistTeam, isManagerRole } from "../middleware/queries";
import { createRoleQuery, createJoinTeamQuery, createExitTeamQuery } from "../controllers/queries";
import { checkPermission } from "../middleware/protected";
import { queryTypes } from "../utils/enums";

const queriesRoute = express.Router();

queriesRoute.post(
    "/change-role",
    verify,
    checkPermission.bind({ permission: 'changeRole' }),
    isPlayerInTeamVerify,
    checkQueryExists.bind({ queryType: queryTypes.CHANGE_ROLE }),
    isManagerRole,
    createRoleQuery
);

queriesRoute.post(
    "/join-team",
    verify,
    checkPermission.bind({ permission: 'joinTeam' }),
    isPlayerInTeamVerify,
    isExistTeam,
    checkQueryExists.bind({ queryType: queryTypes.JOIN_TEAM }),
    createJoinTeamQuery
);

queriesRoute.post(
    "/exit-from-team",
    verify,
    checkPermission.bind({ permission: 'exitTeam' }),
    isPlayerInTeamVerify,
    checkQueryExists.bind({ queryType: queryTypes.EXIT_FROM_TEAM }),
    createExitTeamQuery
)

export { queriesRoute };
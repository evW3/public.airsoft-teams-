import * as express from "express";

import { verify } from "../middleware/token";
import { createRoleQuery, createJoinTeamQuery, createExitTeamQuery, getQueries } from "../controllers/queries";
import { checkPermission } from "../middleware/protected";
import {queryTypes, userRoles} from "../utils/enums";
import { isQueryUniqueVerify } from "../middleware/managers";
import {
    isPlayerInTeamVerify,
    checkQueryExists,
    isExistTeam,
    isNotPlayerInTeamVerify,
    parseUserId
} from "../middleware/queries";
import {checkUserRole} from "../middleware/global";

const queriesRoute = express.Router();


queriesRoute.get(
    "/",
    verify,
    checkPermission.bind({ permission: 'getQueries' }),
    getQueries
);

queriesRoute.post(
    "/change-role",
    verify,
    checkPermission.bind({ permission: 'changeRole' }),
    isQueryUniqueVerify.bind({ queryType: queryTypes.CHANGE_ROLE }),
    isNotPlayerInTeamVerify,
    checkUserRole.bind({ roleName: userRoles.PLAYER }),
    createRoleQuery
);

queriesRoute.post(
    "/join-team",
    verify,
    checkPermission.bind({ permission: 'joinTeam' }),
    isExistTeam,
    isQueryUniqueVerify.bind({ queryType: queryTypes.JOIN_TEAM }),
    createJoinTeamQuery
);

queriesRoute.post(
    "/exit-from-team",
    verify,
    checkPermission.bind({ permission: 'exitTeam' }),
    parseUserId,
    isPlayerInTeamVerify,
    checkQueryExists.bind({ queryType: queryTypes.EXIT_FROM_TEAM }),
    createExitTeamQuery
)

export { queriesRoute };
import * as express from "express";

import { verify } from "../middleware/token";
import { createRoleQueryVerify, createEnterTeamQueryVerify } from "../middleware/queries";
import { createRoleQuery, createJoinTeamQuery } from "../controllers/queries";
import {checkPermission} from "../middleware/protected";

const queriesRoute = express.Router();

queriesRoute.post(
    "/change-role",
    verify,
    checkPermission.bind({ permission: 'changeRole' }),
    createRoleQueryVerify,
    createRoleQuery
);
queriesRoute.post(
    "/join-team",
    verify,
    checkPermission.bind({ permission: 'joinTeam' }),
    createEnterTeamQueryVerify,
    createJoinTeamQuery
);

export { queriesRoute };
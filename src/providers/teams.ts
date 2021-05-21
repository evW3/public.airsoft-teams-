import * as express from "express";

import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { registerTeam } from "../controllers/teams";
import { getTeamMembers } from "../services/teams";
import {parseParameterName} from "../middleware/teams";

const teamsRout = express.Router();

teamsRout.post(
    "/",
    verify,
    checkPermission.bind({ permission: 'registerTeam' }),
    registerTeam
);

teamsRout.get(
    "/:name",
    verify,
    checkPermission.bind({ permission: '' }),
    parseParameterName,
    getTeamMembers
)

export { teamsRout };
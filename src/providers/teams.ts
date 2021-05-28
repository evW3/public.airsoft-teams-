import express from "express";

import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import {getPlayersWhoIntoTeam, getTeamPlayers, registerTeam} from "../controllers/teams";
import { parseParameterName } from "../middleware/teams";

const teamsRout = express.Router();

teamsRout.post(
    "/",
    verify,
    checkPermission.bind({ permission: 'registerTeam' }),
    registerTeam
);

teamsRout.get(
    "/:teamId",
    verify,
    checkPermission.bind({ permission: 'getTeamMembers' }),
    parseParameterName,
    getTeamPlayers
)

teamsRout.get(
    "/",
    verify,
    checkPermission.bind({ permission: 'getPlayersWhoIntoTeam' }),
    getPlayersWhoIntoTeam
);

export { teamsRout };
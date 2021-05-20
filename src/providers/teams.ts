import * as express from "express";

import { verify } from "../middleware/token";
import { checkPermission } from "../middleware/protected";
import { registerTeam } from "../controllers/teams";

const teamsRout = express.Router();

teamsRout.post("/", verify, checkPermission.bind({ permission: 'registerTeam' }), registerTeam);

export { teamsRout };
import express from "express";

import { verify } from "../middleware/token";
import { createRoleQueryVerify, createEnterTeamQueryVerify } from "../middleware/queries";
import { createRoleQuery, createEnterTeamQuery } from "../controllers/queries";

const queriesRoute = express.Router();

queriesRoute.put("/change-role", verify, createRoleQueryVerify, createRoleQuery);
queriesRoute.put("/enter-team", verify, createEnterTeamQueryVerify, createEnterTeamQuery);

export { queriesRoute };
import express from "express";

import { verify } from "../middleware/token";
import { createRoleQueryVerify } from "../middleware/queries";
import { createRoleQuery } from "../controllers/queries";

const queriesRoute = express.Router();

queriesRoute.put("/change-role", verify, createRoleQueryVerify, createRoleQuery);

export { queriesRoute };
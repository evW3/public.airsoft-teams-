import * as express from "express";

import { usersRoute } from "./users";
import { managerRoute } from "./manager";
import { teamsRout } from "./teams";
import { queriesRoute } from "./queries";

const defaultRoutes = express.Router();

defaultRoutes.get('/', (_: any, res: any) => res.status(200).json({ message: 'Welcome to API!' }));
defaultRoutes.use('/users', usersRoute);
defaultRoutes.use('/managers', managerRoute);
defaultRoutes.use('/teams', teamsRout);
defaultRoutes.use('/queries', queriesRoute);

export { defaultRoutes };
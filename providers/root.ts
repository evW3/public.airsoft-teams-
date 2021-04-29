const express = require('express');
const defaultRoutes = express.Router();
import { UsersRoute } from './users';


defaultRoutes.get('/', (_: any, res: any) => res.status(200).json({ message: 'Welcome to API!' }));
defaultRoutes.use('/users', UsersRoute);

export { defaultRoutes };

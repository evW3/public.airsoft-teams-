const express = require('express');
const defaultRoutes = express.Router();
import { usersRoute } from './users';
import { adminRoute } from "./admin";
import { playerRoute } from "./player";


defaultRoutes.get('/', (_: any, res: any) => res.status(200).json({ message: 'Welcome to API!' }));
defaultRoutes.use('/users', usersRoute);
defaultRoutes.use('/admins', adminRoute);
defaultRoutes.use('/players', playerRoute);

export { defaultRoutes };
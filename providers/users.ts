import express from 'express';
const UsersRoute = express.Router();
import { verify } from "../middleware/Token";
import { add, signIn } from "../controllers/users";

UsersRoute.post('/sign-up', add);
UsersRoute.post('/sign-in', signIn);
UsersRoute.post('/sign-in1', verify);

export { UsersRoute };
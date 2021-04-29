import express from 'express';
const UsersRoute = express.Router();
import { verify, codesVerify } from "../middleware/Token";
import { add, signIn, registerDevice } from "../controllers/users";

UsersRoute.post('/sign-up', add);
UsersRoute.post('/sign-in', signIn);
UsersRoute.post('/sign-in1', verify);
UsersRoute.post('/register-devices', codesVerify, registerDevice);

export { UsersRoute };
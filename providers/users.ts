import express from 'express';
const UsersRoute = express.Router();
import { verify, codesVerify, sendRecoverToken } from "../middleware/Token";
import { add, signIn, registerDevice, recoverUserPassword } from "../controllers/users";

UsersRoute.post('/sign-up', add);
UsersRoute.post('/sign-in', signIn);
UsersRoute.post('/sign-in1', verify);
UsersRoute.post('/register-devices', codesVerify, registerDevice);
UsersRoute.post('/recover-password', sendRecoverToken);
UsersRoute.post('/forgot-password', codesVerify, recoverUserPassword);

export { UsersRoute };
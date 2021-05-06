import express from 'express';
const UsersRoute = express.Router();
import { verify, codesVerify } from "../middleware/Token";
import { signUp, signIn, registerDevice, recoverUserPassword, sendRecoverToken } from "../controllers/users";

UsersRoute.put('/sign-up', signUp);
UsersRoute.post('/sign-in', signIn);

UsersRoute.post('/test-only-verify-middleware', verify);

UsersRoute.post('/register-devices', codesVerify, registerDevice);
UsersRoute.post('/recover-password', sendRecoverToken);
UsersRoute.post('/forgot-password', codesVerify, recoverUserPassword);

export { UsersRoute };
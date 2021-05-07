import express from 'express';
const usersRoute = express.Router();
import { verify, codesVerify } from "../middleware/token";
import { signUp, signIn, registerDevice, recoverUserPassword, sendRecoverToken } from "../controllers/users";

usersRoute.put('/sign-up', signUp);
usersRoute.post('/sign-in', signIn);

usersRoute.post('/test-only-verify-middleware', verify);

usersRoute.post('/register-devices', codesVerify, registerDevice);
usersRoute.post('/recover-password', sendRecoverToken);
usersRoute.post('/forgot-password', codesVerify, recoverUserPassword);

export { usersRoute };
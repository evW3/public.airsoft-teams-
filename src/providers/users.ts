import * as express from 'express';

import { verify, codesVerify } from "../middleware/token";
import { uploadPhotoVerify } from "../middleware/formidable";
import {
    signUp,
    signIn,
    registerDevice,
    recoverUserPassword,
    sendRecoverToken,
    getUserProfile,
    updateUserProfile,
    changeUserPhoto
} from "../controllers/users";

const usersRoute = express.Router();

usersRoute.post('/sign-up', signUp);
usersRoute.post('/sign-in', signIn);

usersRoute.post('/test-only-verify-middleware', verify);

usersRoute.post('/register-devices', codesVerify, registerDevice);
usersRoute.post('/recover-password', sendRecoverToken);
usersRoute.put('/forgot-password', codesVerify, recoverUserPassword);

usersRoute.get('/profile', verify, getUserProfile);
usersRoute.put('/profile', verify, updateUserProfile);

usersRoute.post('/upload-photo', verify, uploadPhotoVerify, changeUserPhoto);

export { usersRoute };
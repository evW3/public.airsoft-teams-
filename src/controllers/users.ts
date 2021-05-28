import { NextFunction, Request, Response } from "express";
import * as fs from "fs";

import { create } from "../middleware/token";
import { getRoleIdByName } from "../services/roles";
import { createDevice, isExistDevice,  } from "../services/devices";
import { clearUserCodes } from "../services/verificationCodes";
import { sendSimpleMail, createHtmlLink } from "../utils/smtp";
import { codeToken } from "../middleware/token";
import { encrypt, encryptBySalt } from "../utils/security";
import { Exception } from "../utils/classes";
import {
    createUser,
    isEmailExist,
    getUserSalt,
    isUserValid,
    getIdByEmail,
    isUserHasCode,
    setUserPassword,
    getUser,
    getEmailByUserId,
    setUserLogin,
    setUserPhoto
} from "../services/users";
import { Photo, User, Device, VerificationCode } from "../utils/classes";
import { isExistsUserInBlockList } from "../services/blockList";

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const device = new Device();
        const { password, repeatPassword } = req.body;

        const roleName = "PLAYER";
        user.email = req.body.email;
        device.ip = req.ip;
        device.browser = req.headers['user-agent'];

        const isUnique: boolean = !(await isEmailExist(user.email));

        if(isUnique) {
            if(password && repeatPassword && password === repeatPassword) {

                const encryptData = await encrypt(password);

                user.roleId = await getRoleIdByName(roleName);
                user.password = encryptData.encryptedPassword;
                user.passwordSalt = encryptData.salt;
                user.id = await createUser(user);

                await createDevice(device, user.id);
                const token = await create({ userId: user.id });
                res.status(200).json({ token });
            } else {
                next(new Exception(400, "Password mismatch"));
            }
        } else
            next(new Exception(400, "User already exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can\`t create user"));
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.password = req.body.password;
        user.email = req.body.email;
        user.id = await getIdByEmail(user.email);
        const isExists: boolean = (await isEmailExist(user.email));

        if(isExists && !(await isExistsUserInBlockList(user.id))) {
            user.passwordSalt = await getUserSalt(user.email);

            const encryptPassword: string = await encryptBySalt(user.password, user.passwordSalt);

            const isValid: boolean = await isUserValid(user.email, encryptPassword);
            user.id = await getIdByEmail(user.email);

            if(isValid) {
                const token = await create({ userId: user.id });
                res.status(200).json({ token });
            } else
                next(new Exception(400, "Email or password isn`t correct"));
        } else
            next(new Exception(400, "Can`t find user"));
    } catch (e) {
        if(e instanceof Exception) {
            next(e);
        } else
          next(new Exception(500, "Can`t signIn"));
    }
}

export async function recoverUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const verificationCode = new VerificationCode();
        user.id = req.body.userId;
        verificationCode.code = req.body.code;
        const { password, repeatPassword } = req.body;
        if(password === repeatPassword) {
            const isValidCode: boolean = await isUserHasCode(user.id, verificationCode.code);
            if(isValidCode) {

                const encryptData = await encrypt(password);
                user.password = encryptData.encryptedPassword;
                user.passwordSalt = encryptData.salt;

                await setUserPassword(user);
                await clearUserCodes(user.id);

                res.status(200).json({ message: 'Password was changed' });
            } else
                next(new Exception(400, "incorrect data to recover password"));
        } else
            next(new Exception(400, "password mismatch"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t recover password"));
    }
}

export async function sendRecoverToken(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.email = req.body.email;
        const isExists: boolean = await isEmailExist(user.email);

        if(isExists) {
            user.id = await getIdByEmail(user.email);
            const tokenToRecoverPassword: string = await codeToken(user.id);
            await sendSimpleMail(
                createHtmlLink("/forgot-password", "token", tokenToRecoverPassword, "Change password"),
                "Recover user password",
                user.email
            );
            res.status(200).json({ message: 'Check email to recover password' });
        } else
            next(new Exception(400, "Can`t find user"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t send recover token"));
    }
}

export async function registerDevice(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const verifyCode = new VerificationCode();
        const device = new Device();

        device.ip = req.body.ip;
        device.browser = req.body.browser;
        verifyCode.code = req.body.code;
        user.id = req.body.userId;
        const isUnique = !(await isExistDevice(device, user.id));

        if(isUnique) {
            const isValidCode: boolean = await isUserHasCode(user.id, verifyCode.code);
            if(isValidCode) {
                await createDevice(device, user.id);
                await clearUserCodes(user.id);
                res.status(200).json({ message: 'Device is register' });
            } else
                next(new Exception(400, "Invalid code"));
        } else
            next(new Exception(400, "This device already exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t register device"));
    }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.userId;
        //const teamInfo = await getTeamNameByUserId(user.id);
        const userProfile = await getUser(user.id);
        res.status(200).json(userProfile);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get user profile"))
    }
}

export async function updateUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const currentPassword: string | null = req.body.currentPassword || null;
        const newPassword: string | null = req.body.newPassword || null;

        user.id = req.body.userId;

        if(req.body.login) {
            user.login = req.body.login;
            await setUserLogin(user);
        }

        user.email = await getEmailByUserId(user.id);

        if(currentPassword && newPassword) {
            console.log(currentPassword, newPassword);
            user.passwordSalt = await getUserSalt(user.email);
            user.password = await encryptBySalt(currentPassword, user.passwordSalt);
            const isValid: boolean = await isUserValid(user.email, user.password);

            if(isValid) {
                const encryptData = await encrypt(newPassword);
                user.password = encryptData.encryptedPassword;
                user.passwordSalt = encryptData.salt;
                await setUserPassword(user);
            } else
                next(new Exception(400, "Password isn`t correct"));
        }
        res.status(200).json({ message: "User profile was updated" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t update user profile"));
    }
}

export async function changeUserPhoto(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.userId;
        const photo: Photo = req.body.image;
        fs.writeFileSync(photo.fullFilePathToWrite, fs.readFileSync(photo.imagePathToLoad));
        await setUserPhoto(user.id, photo.url);
        res.status(200).json({ photo: photo.url });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t upload photo"))
    }
}
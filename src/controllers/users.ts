import { NextFunction, Request, Response } from "express";
import * as config from "config";
import * as fs from "fs";

import { create } from "../middleware/token";
import { getRoleIdByName } from "../services/roles";
import { createDevice, isExistDevice,  } from "../services/devices";
import { clearUserCodes } from "../services/verificationCodes";
import { sendSimpleMail } from "../utils/smtp";
import { codeToken } from "../middleware/token";
import { encrypt, encryptBySalt } from "../utils/security";
import { Response as Res } from "../utils/classes";
import { HttpException } from "../utils/classes";
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
import {Photo, UserInfo} from "../utils/classes";

const url: string = config.get('url');

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new UserInfo();
        user.email = req.body.email;
        console.log(typeof user.email);
        const { password, repeatPassword } = req.body;
        const isUnique: boolean = !(await isEmailExist(user.email));
        const roleName = "PLAYER";
        if(isUnique) {
            if(
                password &&
                repeatPassword &&
                password === repeatPassword &&
                req?.ip &&
                req?.headers['user-agent']
            ) {

                const encryptData = await encrypt(password);

                const roleId: number | null = await getRoleIdByName(roleName);
                if(roleId) {
                    const userId: number = await createUser({
                        password: encryptData.strongPassword,
                        password_salt: encryptData.salt,
                        email: user.email,
                        roleId
                    });
                    if(userId) {
                        await createDevice(req.ip, req?.headers['user-agent'], userId);
                        res.status(200).json({ token: await create({ userId }) });
                    }
                }
            } else {
                const serverResponse = new Res(400, "Incorrect query")
                serverResponse.sendResponse(res);
            }
        } else {
            const serverResponse = new Res(400, "User already exists")
            serverResponse.sendResponse(res);
        }
    } catch (e) {
        next(new HttpException(500, "Can\`t create user"));
    }
}

export async function signIn(req: Request, res: Response) {
    try {
        const { password, email } = req.body;
        const isExists: boolean = password && email && (await isEmailExist(email));
        if(isExists) {
            const userSalt: string | null = await getUserSalt(email);
            if(userSalt) {
                const strongPassword: string = await encryptBySalt(password, userSalt);

                const isValid: boolean = await isUserValid(email, strongPassword);
                const userId: number | null = await getIdByEmail(email);

                if(isValid && userId) {
                    res.status(200).json({ token: await create({ userId }) });
                } else {
                    res.status(400).json({ error: "Email or password isn`t correct"});
                }
            }
        } else {
            res.status(400).json({ error: "Can`t find user"})
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: `Can\`t signIn \n${ e }` });
    }
}

export async function recoverUserPassword(req: Request, res: Response) {
    try {
        const { password, repeatPassword, code, userId } = req.body;
        if(password === repeatPassword) {
            const isValidCode: boolean = await isUserHasCode(userId, code);
            if(isValidCode) {

                const encryptData = await encrypt(password);

                await setUserPassword(userId, encryptData.strongPassword, encryptData.salt);
                await clearUserCodes(userId);
                res.status(200).json({ message: 'password was changed' })
            } else {
                res.status(400).json({ error: 'incorrect data to recover password' });
            }
        } else {
            res.status(400).json({ error: 'password mismatch' });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t recover password \n${ e }` });
    }
}

export async function sendRecoverToken(req: Request, res: Response) {
    try {
        const { email } = req.body;
        const isExists: boolean = email && await isEmailExist(email);
        if(isExists) {
            const userId: number | null = await getIdByEmail(email);
            if(userId) {
                const tokenToRecoverPassword: string = await codeToken(userId, null);
                await sendSimpleMail(
                    `<a href="${ url }/forgot-password?token=${ tokenToRecoverPassword }">Change password</a>`,
                    "Recover user password",
                    email
                );
                res.status(200).json({ message: 'check email to recover password' });
            }
        } else {
            res.status(400).json({ error: 'Can`t find user' });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t send recover token` });
    }
}

export async function registerDevice(req: Request, res: Response) {
    try {
        const { ip, browser, code, userId } = req.body;
        const isUnique = !(await isExistDevice(userId, ip, browser));
        if(isUnique) {
            const isValidCode: boolean = await isUserHasCode(userId, code);
            if(isValidCode) {
                if(ip && browser) {
                    await createDevice(ip, browser, userId);
                    await clearUserCodes(userId);
                    res.status(200).json({ message: 'device is register' });
                } else {
                    res.status(400).json({ error: 'invalid fields' });
                }
            } else {
                res.status(400).json({ error: 'invalid code' });
            }
        } else {
            res.status(400).json({ error: 'This device already exists' });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t register device \n${ e }` });
    }
}

export async function getUserProfile(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        res.status(200).json({ user: await getUser(userId) });
    } catch (e) {
        res.status(500).json({ error: `Can\`t get user profile \n${ e }` });
    }
}

export async function updateUserProfile(req: Request, res: Response) {
    try {
        const user = new UserInfo();
        const currentPassword: string | null = req.body.currentPassword || null;
        const newPassword: string | null = req.body.newPassword || null;

        user.id = req.body.userId;

        if(req.body.login) {
            user.login = req.body.login;
            await setUserLogin(user.id, user.login);
        }

        const email: string | null = await getEmailByUserId(user.id);

        if(email && currentPassword && newPassword) {

            const userSalt: string | null = await getUserSalt(email);
            const strongPassword: string = await encryptBySalt(<string>currentPassword, <string>userSalt);
            const isValid: boolean = await isUserValid(email, strongPassword);

            if(isValid) {
                const encryptData = await encrypt(<string>newPassword);
                await setUserPassword(user.id, encryptData.strongPassword, encryptData.salt);
            }
        }

        res.status(200).json({ message: "User profile was updated" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t update user profile \n${ e }` });
    }
}

export async function changeUserPhoto(req: Request, res: Response) {
    try {
        const user = new UserInfo();
        user.id = req.body.userId;
        const photo: Photo = req.body.image;
        fs.writeFileSync(photo.fullFilePathToWrite, fs.readFileSync(photo.imagePathToLoad));
        await setUserPhoto(user.id, photo.url);
        res.status(200).json({ photo: photo.url });
    } catch (e) {
        res.status(500).json({ message: `Can\`t upload photo: ${ e }` });
    }
}
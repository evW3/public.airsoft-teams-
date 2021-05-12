import * as express from "express";
import config from "config";
import formidable from "formidable"

import { ROLES } from "../constants";
import { create } from "../middleware/token";
import { getRoleIdByName, getUserRole } from "../services/roles";
import { createDevice, isExistDevice,  } from "../services/devices";
import { clearUserCodes } from "../services/verificationCodes";
import { sendSimpleMail } from "../utils/smtp";
import { codeToken } from "../middleware/token";
import { encrypt, encryptBySalt } from "../utils/security";
import {
    createUser,
    isEmailExist,
    getUserSalt,
    isUserValid,
    getIdByEmail,
    isUserHasCode,
    setUserPassword,
    getUserInfo
} from "../services/users";

const url: string = config.get('url');

export async function signUp(req: express.Request, res: express.Response) {
    try {
        const { password, repeatPassword, email } = req.body;
        const isUnique: boolean = email && !(await isEmailExist(email));
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
                        email,
                        roleId
                    });
                    if(userId) {
                        await createDevice(req.ip, req?.headers['user-agent'], userId);
                        res.status(200).json({ token: await create({ userId }) });
                    }
                }
            } else {
                res.status(400).json({ error: "Incorrect query" });
            }
        } else {
            res.status(400).json({ error: "User already exists" });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t create user\n${ e }` });
    }
}

export async function signIn(req: express.Request, res: express.Response) {
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

export async function recoverUserPassword(req: express.Request, res: express.Response) {
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

export async function sendRecoverToken(req: express.Request, res: express.Response) {
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

export async function registerDevice(req: express.Request, res: express.Response) {
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

export async function getUserProfile(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.body;
        res.status(200).json({ user: await getUserInfo(userId) });
    } catch (e) {
        res.status(500).json({ error: `Can\`t get user profile \n${ e }` });
    }
}

export async function updateUserProfile(req: express.Request, res: express.Response) {
    try {
        const form = new formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(fields, files);
                res.status(400).json({ error: err });
                return;
            }
            res.status(200).json({ message: "Files are upload successfully" });
        });
    } catch (e) {
        res.status(500).json({ error: `Can\`t update user profile \n${ e }` });
    }
}
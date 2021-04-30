import * as express from "express";
import config from "config";
import bcrypt from "bcrypt";

import { ROLES } from "../constants";
import { create } from "../middleware/Token";
import { getRoleIdByName } from "../services/roles";
import { createDevice, isExistDevice,  } from "../services/devices";
import { clearUserCodes } from "../services/verificationCodes";
import {
    createUser,
    isEmailExist,
    getUserSalt,
    isUserValid,
    getIdByEmail,
    isUserHasCode,
    setUserPassword,
    isUserActivated
} from "../services/users";

interface Ibcrypt {
    saltRounds: number,
    globalSalt: string
}

const bcryptInfo: Ibcrypt = config.get('security');

export async function add(req: express.Request, res: express.Response) {
    try {
        const { password, repeatPassword, email, role } = req.body;
        const isUnique: boolean = email && !(await isEmailExist(email));
        const roleName = role && ROLES[role];
        if(isUnique && roleName) {
            if(
                password &&
                repeatPassword &&
                password === repeatPassword &&
                req?.ip &&
                req?.headers['user-agent']
            ) {

                const salt: string = await bcrypt.genSalt(bcryptInfo.saltRounds);
                const saltPassword: string = password + bcryptInfo.globalSalt;
                const hashPassword: string = await bcrypt.hash(saltPassword, salt);

                const roleId: number = await getRoleIdByName(roleName);

                const userId: number = await createUser({ password: hashPassword, password_salt: salt, email, roleId });

                await createDevice(req.ip, req?.headers['user-agent'], userId);

                res.status(200).json({ message: "user was created" });
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
            const isActivation: boolean = await isUserActivated(email);
            if(isActivation) {

                const userSalt: any = await getUserSalt(email);
                const saltPassword: string = password + bcryptInfo.globalSalt;
                const hashPassword: string = await bcrypt.hash(saltPassword, userSalt);

                const isValid: boolean = await isUserValid(email, hashPassword);
                const userId: number = await getIdByEmail(email);

                if(isValid && userId) {
                    res.status(200).json({ token: await create({ userId }) });
                } else {
                    res.status(400).json({ error: "Email or password isn`t correct"});
                }
            } else {
                res.status(400).json({ error: "Your account is not activated yet"});
            }
        } else {
            res.status(400).json({ error: "Can`t find user"})
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t signIn \n${ e }` });
    }
}

export async function recoverUserPassword(req: express.Request, res: express.Response) {
    try {
        const { password, repeatPassword, code, userId } = req.body;
        if(password === repeatPassword) {
            const isValidCode: boolean = await isUserHasCode(userId, code);
            if(isValidCode) {
                await setUserPassword(userId, password);
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
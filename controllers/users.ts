import * as express from "express";
import config from "config";
import bcrypt from "bcrypt";

import { create } from "../middleware/Token";
import { createDevice, isExistDevice } from "../services/devices";
import { createUser, isEmailExist, getUserSalt, isUserValid, getIdByEmail, isUserHasCode } from "../services/users";

interface Ibcrypt {
    saltRounds: number,
    globalSalt: string
}

const bcryptInfo: Ibcrypt = config.get('security');

export async function add(req: express.Request, res: express.Response) {
    try {
        const { password, repeatPassword, email } = req.body;
        const isUnique: boolean = email && !(await isEmailExist(email));
        if(isUnique) {
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

                const userId: number = await createUser({ password: hashPassword, password_salt: salt, email });

                await createDevice(req.ip, req?.headers['user-agent'], userId);

                const token: string = await create({ userId });

                res.status(200).json({ token });
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
            res.status(400).json({ error: "Password field can`t be undefined"});
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t signIn \n${ e }` });
    }
}

export async function recoverUserPassword(req: express.Request, res: express.Response) {
    try {
        const { password, repeatPassword, code, email } = req.body;

    } catch (e) {
        res.status(500).json({ error: `Can\`t recover password \n${ e }` });
    }
}

export async function registerDevice(req: express.Request, res: express.Response) {
    try {
        const { ip, browser, code, userId } = req.body;
        const isValidCode: boolean = await isUserHasCode(userId, code);
        const isUnique = await isExistDevice(userId, ip, browser);
        if(isValidCode) {
            if(ip && browser) {
                await createDevice(ip, browser, userId);
                res.status(200).json({ message: 'device is register' });
            } else {
                res.status(400).json({ error: 'invalid fields' });
            }
        } else {
            res.status(400).json({ error: 'invalid code' });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t register device \n${ e }` });
    }
}
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import config from 'config';

import { getUserDevices } from "../services/devices";
import { getEmailByUserId, getIdByEmail, isEmailExist } from "../services/users";
import { sendSimpleMail } from "../utils/smtp";
import { createCode } from "../services/verificationCodes";

interface Itoken {
    secretKey: string,
    expiresIn: string,
    codesKey: string,
    codesExpiresIn: string
}

const tokenData: Itoken = config.get('token');

const url: string = config.get('url');

export async function codeToken(data: any) {
    const code: string = await createCode(data.userId);
    return jwt.sign({ ...data, code }, tokenData.codesKey, { expiresIn: tokenData.codesExpiresIn });
}

export async function create(user: object) {
    return jwt.sign(user, tokenData.secretKey, { expiresIn: tokenData.expiresIn });
}

export async function verify(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req?.body;
        const reqIp: any = req?.ip;
        const reqBrowser: any = req?.headers['user-agent'];

        if(token && reqIp && reqBrowser) {

            const user: any = await jwt.verify(token, tokenData.secretKey);
            const devices: any[] = await getUserDevices(user.userId);
            let isValid: boolean = false;

            devices.forEach(item => {
                if(reqIp === item.ip && reqBrowser === item.browser) {
                    isValid = true;
                }
            });
            if(isValid) {
                req.body = { ...requestBody, userId: user.userId };
                next();
            } else {

                const token = await codeToken({ userId: user.userId, ip: reqIp, browser: reqBrowser });
                const email: string = await getEmailByUserId(user.userId);
                await sendSimpleMail(
                    `<a href="${ url }/register-device?token=${ token }">Activate device</a>`,
                    "Register new device",
                    email
                );

                res.status(403).json({
                    error: "device is not registered for this user, check email to registered it"
                });
            }
        } else {
            res.status(401).json({ error: 'token can`t be undefined' });
        }
    } catch (e) {
        res.status(401).json({ error: 'incorrect token' });
    }
}

export async function codesVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req.body;

        if(token) {
            const data: any = jwt.verify(token, tokenData.codesKey);
            if(data.code) {
                req.body = { ...requestBody, ...data };
                next();
            } else {
                res.status(401).json({ error: 'incorrect recover token' });
            }
        } else {
            res.status(401).json({ error: 'recover token can`t be undefined' });
        }
    } catch (e) {
        res.status(401).json({ error: 'incorrect recover token' });
    }
}
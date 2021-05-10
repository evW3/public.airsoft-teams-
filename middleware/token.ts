import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import config from 'config';

import { getUserDevices } from "../services/devices";
import { getEmailByUserId } from "../services/users";
import { sendSimpleMail } from "../utils/smtp";
import { createCode } from "../services/verificationCodes";
import { IToken, ICodeTokenBody, IDefaultTokenBody } from "../utils/interfaces";


const tokenData: IToken = config.get('token');

const url: string = config.get('url');

export async function codeToken(userId: number, data: object | null): Promise<string> {
    const code: string = await createCode(userId);
    const body: ICodeTokenBody = { userId, code, ...data };
    return jwt.sign(body, tokenData.codesKey, { expiresIn: tokenData.codesExpiresIn });
}

export async function create(user: object): Promise<string> {
    return jwt.sign(user, tokenData.secretKey, { expiresIn: tokenData.expiresIn });
}

export async function verify(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req?.body;
        const reqIp: string | null = req?.ip;
        const reqBrowser: string | undefined = req?.headers['user-agent'];

        if(token && reqIp && reqBrowser) {
            // Q
            const userI: any = jwt.verify(token, tokenData.secretKey);
            const user: IDefaultTokenBody | null = userI || null;

            if(user) {
                const devices = await getUserDevices(user.userId);
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
                    const token = await codeToken(user.userId, { ip: reqIp, browser: reqBrowser });
                    const email: string | null = await getEmailByUserId(user.userId);
                    if(email) {
                        await sendSimpleMail(
                            `<a href="${ url }/register-device?token=${ token }">Activate device</a>`,
                            "Register new device",
                            email
                        );

                        res.status(403).json({
                            error: "device is not registered for this user, check email to registered it"
                        });
                    }
                }
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
        const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req.body;

        if(token) {
            // Q
            const dataI: any = jwt.verify(token, tokenData.codesKey);
            const data: ICodeTokenBody | null = dataI || null;

            if(data) {
                if(data.code) {
                    req.body = { ...requestBody, ...data };
                    next();
                } else {
                    res.status(401).json({ error: 'incorrect recover token' });
                }
            }
        } else {
            res.status(401).json({ error: 'recover token can`t be undefined' });
        }
    } catch (e) {
        res.status(401).json({ error: 'incorrect recover token' });
    }
}
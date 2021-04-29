import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import config from 'config';

import { getUserDevices } from "../services/devices";

interface Itoken {
    secretKey: string,
    expiresIn: string
}

const tokenData: Itoken = config.get('token');

export async function create(user: object) {
    return jwt.sign(user, tokenData.secretKey, { expiresIn: tokenData.expiresIn });
}

export async function verify(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req.body;
        if(token) {
            const user: any = await jwt.verify(token, tokenData.secretKey);
            const devices: any[] = await getUserDevices(user.userId);
            let isValid: boolean = false;
            devices.forEach(item => {
                if(req?.ip === item.ip && req?.headers['user-agent'] === item.browser) {
                    isValid = true;
                }
            });
            if(isValid) {
                req.body = { ...requestBody, userId: user.userId };
                next();
            } else {

            }
        } else {
            res.status(401).json({ error: 'token can`t be undefined' });
        }
    } catch (e) {
        res.status(401).json({ error: 'incorrect token' });
    }
}
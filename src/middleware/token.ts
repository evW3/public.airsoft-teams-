import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import * as config from 'config';

import { getUserDevices } from "../services/devices";
import { getEmailByUserId } from "../services/users";
import { sendSimpleMail, createHtmlLink } from "../utils/smtp";
import { createCode } from "../services/verificationCodes";
import { IToken, ICodeTokenBody, IDefaultTokenBody } from "../utils/interfaces";
import { getBlockDescription, isExistsUserInBlockList } from "../services/blockList";
import { Device, Exception, User } from "../utils/classes";

const tokenData: IToken = config.get('token');

export async function codeToken(userId: number, device: Device | null = null): Promise<string> {
    const code: string = await createCode(userId);
    let body: ICodeTokenBody;

    if(device instanceof Device)
        body = { userId, code, ...device.createDeviceObject() };
    else
        body = { userId, code };

    return jwt.sign(body, tokenData.codesKey, { expiresIn: tokenData.codesExpiresIn });
}

export async function create(user: object): Promise<string> {
    return jwt.sign(user, tokenData.secretKey, { expiresIn: tokenData.expiresIn });
}

export async function verify(req: Request, res: Response, next: NextFunction) {
    try {
        const device = new Device();
        const user = new User();
        const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req.body;
        device.ip = req.ip;
        device.browser = req?.headers['user-agent'];

        if(token) {

            const tokenBody = <IDefaultTokenBody>jwt.verify(token, tokenData.secretKey);
            user.id = tokenBody.userId;

            const devices = await getUserDevices(user.id);

            if(device.checkDeviceInArray(devices)) {
                if(!await isExistsUserInBlockList(user.id)) {
                    req.body = { ...requestBody, userId: user.id };
                    next();
                } else {
                    const description = await getBlockDescription(user.id);
                    next(new Exception(400, `Admin has blocked ur account, description: ${ description }`));
                }
            } else {
                const token = await codeToken(user.id, device);
                user.email = await getEmailByUserId(user.id);
                await sendSimpleMail(
                    createHtmlLink("register-device", "token", token, "Activate device"),
                    "Register new device",
                    user.email
                );

                next(new Exception(403, "Device is not registered for this user, check email to registered it"))
            }
        } else {
            next(new Exception(401, "Token can`t be undefined"))
        }
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(401, "Incorrect token"));
    }
}

export async function codesVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
        const requestBody = req.body;
        if(token) {
            const data = <ICodeTokenBody>jwt.verify(token, tokenData.codesKey);
            if(data) {
                if(data.code) {
                    req.body = { ...requestBody, ...data };
                    next();
                } else {
                    next(new Exception(401, "Incorrect recover token"));
                }
            }
        } else {
            next(new Exception(401, "Recover token can`t be undefined"))
        }
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(401, "Incorrect recover token"));
    }
}
import { NextFunction, Request, Response } from "express";

import { Exception, User } from "../utils/classes";
import { userRoles } from "../utils/enums";
import { getUserRole } from "../services/roles";
import { isExistsUserInBlockList } from "../services/blockList";

export async function isTheSamePlayer(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body;
        const user = req.body.userObject;
        if(userRoles.PLAYER === await getUserRole(userId)) {
            if(user.id === userId)
                next();
            else
                next(new Exception(403, "Can`t change user query status"));
        } else
            next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user"));
    }
}

export async function isNotUserInBlockList(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        if(!(await isExistsUserInBlockList(user.id)))
            next();
        else
            next(new Exception(400, "User already banned"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user in block list"));
    }
}

export async function isUserInBlockList(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        const isUserBanned = await isExistsUserInBlockList(user.id);
        if(isUserBanned)
            next();
        else
            next(new Exception(400, "Can`t find user in block list"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user in block list"));
    }
}

export function parsePlayerId(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.playerId;
        req.body = { ...req.body, userObject: user };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t parse player id"));
    }
}
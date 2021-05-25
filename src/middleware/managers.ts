import { NextFunction, Request, Response } from "express";

import { statuses } from "../utils/enums";
import { isExistsUserInBlockList } from "../services/blockList";
import { Exception, Query, User } from "../utils/classes";
import { IThisQueryType } from "../utils/interfaces";
import { isQueryUnique } from "../services/queries";

export async function getIdFromParams(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = Number.parseInt(req.params.id);
        req.body = { ...req.body, userObject: user };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get id from params"));
    }
}

export async function blockManagerVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        if(!await isExistsUserInBlockList(user.id)) {
            next();
        } else
            next(new Exception(400, "This user already banned"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t block manager "));
    }
}

export async function unblockManagerVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
         const isInBlockList = await isExistsUserInBlockList(user.id);
         if(isInBlockList) {
             next();
         } else
             next(new Exception(400, "User not found in ban list"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t unblock manager "));
    }
}


export async function isQueryUniqueVerify(this: IThisQueryType, req: Request, res: Response, next: NextFunction) {
    try {
        const query = new Query();
        const user = new User();

        user.id = req.body.userId;
        query.userId = user.id;
        query.type = this.queryType;
        query.status = statuses.PROCESSED;

        const isUnique = await isQueryUnique(query);

        if(isUnique) {
            req.body = { ...req.body, queryObject: query, userObject: user };
            next();
        } else
            next(new Exception(400, "Query already exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t unblock manager "));
    }
}

export function parseManagerId(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.managerId;
        req.body = { ...req.body, userObject: user };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t parse id"));
    }
}
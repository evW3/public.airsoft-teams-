import { NextFunction, Request, Response } from "express";

import {statuses, userRoles} from "../utils/enums";
import { getUserRole } from "../services/roles";
import { isExistsUserInBlockList } from "../services/blockList";
import {Exception, Query, User} from "../utils/classes";
import {IThisQueryType} from "../utils/interfaces";
import {isExistQuery} from "../services/queries";

export async function checkManagerRole(req: Request, res: Response, next: NextFunction) {
    try {
        const manager = new User();
        manager.id = req.body.managerId
        const role = await getUserRole(manager.id);
        if(role && role === userRoles.MANAGER) {
            next();
        } else
            next(new Exception(400, "Can`t find manager"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check manager role "));
    }
}

export async function getIdFromParams(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = Number.parseInt(req.params.id);
        const reqBody = req.body;
        req.body = { ...reqBody, managerId: user.id };
        next()
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get id from params"));
    }
}

export async function blockManagerVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const { managerId } = req.body;
        if(!await isExistsUserInBlockList(managerId)) {
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
         const { managerId } = req.body;
         if(await isExistsUserInBlockList(managerId)) {
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

export async function isQueryExists(this: IThisQueryType, req: Request, res: Response, next: NextFunction) {
    try {
        const query = new Query();
        const user = new User();

        user.id = req.body.userId;
        query.userId = user.id;
        query.type = this.queryType;
        query.status = statuses.PROCESSED;

        if(await isExistQuery(query))
            next();
        else
            next(new Exception(400, "Can`t find query"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t unblock manager "));
    }
}
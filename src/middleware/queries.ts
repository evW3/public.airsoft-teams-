import { NextFunction, Request, Response } from "express";

import { isExistQuery } from "../services/queries";
import { getUserIdByQueryId } from "../services/users";
import { isTeamHaveUser } from "../services/teams";
import { statuses, queryTypes, userRoles } from "../utils/enums";
import { getUserRole } from "../services/roles";
import { Exception, Query, User } from "../utils/classes";

export async function createRoleQueryVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const query = new Query();
        user.id = req.body.userId;
        query.userId = user.id;
        query.status = statuses.PROCESSED;
        query.type = queryTypes.CHANGE_ROLE;

        if(!await isExistQuery(query)) {
            const role = await getUserRole(user.id);
            if(role && role === userRoles.MANAGER)
                next(new Exception(400, "Ur role already changed"));
            else if (role)
                next();
        } else
            next(new Exception(400, "This query already exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify query "));
    }
}

export async function changeRoleQueryVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const query = new Query();
        const { queryId } = req.body;
        const requestBodyTmp = req.body;
        user.id = await getUserIdByQueryId(queryId);
        query.userId = user.id;
        query.type = queryTypes.CHANGE_ROLE;
        query.status = statuses.PROCESSED;
        if(await isExistQuery(query)) {
            req.body = { ...requestBodyTmp, userId: user.id };
            next();
        } else
            next(new Exception(400, "Query doesn`t exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify query "));
    }
}

export async function createEnterTeamQueryVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const query = new Query();

        user.id = req.body.userId;
        query.userId = user.id;
        query.type = queryTypes.ENTER_TEAM;
        query.status = statuses.PROCESSED;

        if(!await isTeamHaveUser(user.id) ) {
            if(!await isExistQuery(query)) {
                next();
            } else
                next(new Exception(400, "Query already exists"));
        } else
            next(new Exception(400, "User already in team"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify enter team "));
    }
}
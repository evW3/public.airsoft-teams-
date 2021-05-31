import { NextFunction, Request, Response } from "express";

import { isExistQuery } from "../services/queries";
import { getUserIdByQueryId } from "../services/users";
import { isPlayerInTeam } from "../services/teamMembers";
import { statuses } from "../utils/enums";
import { Exception, Query, User } from "../utils/classes";
import { isExistTeamById } from "../services/teams";
import { IThisQueryType } from "../utils/interfaces";

export async function getUserIdByQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        const { queryId } = req.body;
        user.id = await getUserIdByQueryId(queryId);
        req.body = { ...req.body, userObject: user };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify query"));
    }
}

export async function isExistTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { teamId } = req.body;

        if(teamId && typeof teamId === "number" && await isExistTeamById(teamId)) {
            next();
        } else
            next(new Exception(400, "Team doesn`t exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify enter team"));
    }
}

export async function checkQueryExists(this: IThisQueryType, req: Request, res: Response, next: NextFunction) {
    try {
        const query = new Query();
        const user = req.body.userObject;

        query.userId = user.id;
        query.type = this.queryType;
        query.status = statuses.PROCESSED;

        if(!await isExistQuery(query)) {
            req.body = { ...req.body, queryObject: query };
            next();
        } else
            next(new Exception(400, "Query already exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t find user query"));
    }
}

export async function isPlayerInTeamVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        const isPlayerHaveTeam = await isPlayerInTeam(user.id);
        if(isPlayerHaveTeam) {
            next();
        } else
            next(new Exception(400, "Player isn`t in team"));
    } catch (e) {
        console.log(e);
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify player team"));
    }
}

export async function parseUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.userId;
        req.body = { ...req.body, userObject: user };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify player team"));
    }
}

export async function isNotPlayerInTeamVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        if(!await isPlayerInTeam(user.id)) {
            next();
        } else
            next(new Exception(400, "Player in team"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify player team"));
    }
}

export async function isQueryExists(this: IThisQueryType, req: Request, res: Response, next: NextFunction) {
    try {
        const query = new Query();
        const user = req.body.userObject;

        query.userId = user.id;
        query.type = this.queryType;
        query.id = req.body.queryId;
        query.status = statuses.PROCESSED;

        const isExists = await isExistQuery(query);
        if(isExists){
            req.body = { ...req.body, queryObject: query };
            next();
        } else
            next(new Exception(400, "Can`t find query"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check query exists"));
    }
}

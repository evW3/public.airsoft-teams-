import { NextFunction, Request, Response } from "express";

import { isExistQuery } from "../services/queries";
import { getUserIdByQueryId } from "../services/users";
import { isPlayerInTeam } from "../services/teamMembers";
import { statuses, userRoles } from "../utils/enums";
import { getUserRole } from "../services/roles";
import { Exception, Query, User } from "../utils/classes";
import { isExistTeamById } from "../services/teams";
import { IThisQueryType } from "../utils/interfaces";

export async function isManagerRole(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();

        user.id = req.body.userId;

        const role = await getUserRole(user.id);
        if(role && role === userRoles.MANAGER)
            next(new Exception(400, "Your role already changed"));
        else if (role)
            next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify query "));
    }
}

export async function getUserIdByQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();

        const { queryId } = req.body;

        user.id = await getUserIdByQueryId(queryId);

        req.body = { ...req.body, userId: user.id };

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
        const user = new User();

        user.id = req.body.userId;
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
        const user = new User();

        user.id = req.body.userId;
        query.userId = user.id;
        query.type = this.queryType;
        query.status = statuses.PROCESSED;

        if(!await isExistQuery(query)) {
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
        const user = new User();
        user.id = req.body.userId;
        if(await isPlayerInTeam(user.id)) {
            next();
        } else
            next(new Exception(400, "Player isn`t in team"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t verify player team"));
    }
}

export async function isNotPlayerInTeamVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.userId;
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
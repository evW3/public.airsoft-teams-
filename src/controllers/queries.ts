import { NextFunction, Request, Response } from "express";
import { createQuery } from "../services/queries";
import { queryTypes, statuses } from "../utils/enums";
import { Exception, User, Query } from "../utils/classes";
import { createQueryParameter } from "../services/queryParams";

export async function createRoleQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const query = new Query();

        user.id = req.body.userId;

        query.type = queryTypes.CHANGE_ROLE;
        query.status = statuses.PROCESSED;
        query.userId = user.id;

        await createQuery(query);
        res.status(200).json({ message: "Query create successfully" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t create query "))
    }
}

export async function createJoinTeamQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        const query = new Query();

        user.id = req.body.userId;

        query.type = queryTypes.JOIN_TEAM;
        query.status = statuses.PROCESSED;
        query.userId = user.id;

        const { teamId } = req.body;
        const queryId = await createQuery(query);
        await createQueryParameter(JSON.stringify({ teamId }), queryId);
        res.status(200).json({ message: "Query create successfully" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t create query"));
    }
}
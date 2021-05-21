import { NextFunction, Request, Response } from "express";
import { Exception, Query } from "../utils/classes";
import { getUserIdByQueryId } from "../services/users";
import { statuses } from "../utils/enums";
import { isExistQuery } from "../services/queries";
import {IThisQueryType} from "../utils/interfaces";

export async function getPlayerIdByQueryId(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId } = req.body;
        if(queryId && typeof queryId === "number") {
            const playerId = await getUserIdByQueryId(queryId);
            if(playerId) {
                req.body = { ...req.body, playerId };
                next();
            } else
                next(new Exception(400, "Can`t find user query"));
        } else
            next(new Exception(400, "Parameters isn`t valid"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t getPlayerIdByQueryId"));
    }
}

export async function isExistsQueryVerify(this: IThisQueryType, req: Request, res: Response, next: NextFunction) {
    try {
        const query = new Query();

        query.userId = req.body.playerId;
        query.type = this.queryType;
        query.status = statuses.PROCESSED;

        if(await isExistQuery(query)) {
            next();
        } else
            next(new Exception(400, "Can`t find query"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t getPlayerIdByQueryId"));
    }
}

export async function checkDescription(req: Request, res: Response, next: NextFunction) {
    try {
        const { description } = req.body;
        if(description && typeof description === "string")
            next();
        else
            next(new Exception(400, "Parameters isn`t valid"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t getPlayerIdByQueryId"));
    }
}
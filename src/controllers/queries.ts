import { NextFunction, Request, Response } from "express";
import { createQuery, findQueries } from "../services/queries";
import { statuses } from "../utils/enums";
import { Exception } from "../utils/classes";
import { createQueryParameter } from "../services/queryParams";


export async function getQueries(req: Request, res: Response, next: NextFunction) {
    try {
        const limit = Number.parseInt(req.body.limit) || 10;
        const offset = Number.parseInt(req.body.offset) || 0;
        const queries = await findQueries(statuses.PROCESSED, limit, offset);
        res.status(200).json(queries);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get queries "));
    }
}

export async function createRoleQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.body.queryObject;
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
        const query = req.body.queryObject;
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

export async function createExitTeamQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.body.queryObject;
        await createQuery(query);
        res.status(200).json({ message: "Exit query was created" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t create query"));
    }
}
import { NextFunction, Request, Response } from "express";
import { Exception } from "../utils/classes";

export function parseParameterName(req: Request, res: Response, next: NextFunction) {
    try {
        const { teamId } = req.params;
        if(teamId && typeof teamId === "number") {
            req.body = { ...req.body, teamId };
            next();
        } else
            next(new Exception(400, "Parameters isn`t valid"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t parse team name"));
    }
}
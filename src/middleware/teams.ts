import { NextFunction, Request, Response } from "express";
import { Exception } from "../utils/classes";

export function parseParameterName(req: Request, res: Response, next: NextFunction) {
    try {
        const teamId = Number.parseInt(req.params.teamId);
        req.body = { ...req.body, teamId };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t parse team name"));
    }
}
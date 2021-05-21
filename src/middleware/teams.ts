import { NextFunction, Request, Response } from "express";
import { Exception } from "../utils/classes";

export function parseParameterName(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.params;
        if(name && typeof name === "string") {
            req.body = { ...req.body, name };
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
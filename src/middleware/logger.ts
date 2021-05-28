import { Exception } from "../utils/classes";
import { NextFunction, Request, Response } from "express";
import { requests } from "../models/requests";

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const request = new requests({
            path: req.path,
            params: { ...req.body }
        });
        request.save();
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Logger error"));
    }
}
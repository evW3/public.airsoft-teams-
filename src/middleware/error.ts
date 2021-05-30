import { NextFunction, Request, Response } from 'express';
import { Exception } from '../utils/classes';
import { errors } from "../models/errors";
import { buildMode } from "../constants";

export async function errorMiddleware(error: Exception, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const errorInstance = new errors({
        path: req.path,
        params: { ...req.body },
        errorDescription: message,
        status,
        mode: buildMode
    });
    await errorInstance.save();
    res.status(status).json({ message });
}
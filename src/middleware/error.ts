import { NextFunction, Request, Response } from 'express';
import { Exception } from '../utils/classes';

export function errorMiddleware(error: Exception, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({ message });
}
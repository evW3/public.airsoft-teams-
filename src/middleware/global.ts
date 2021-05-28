import { IRoleName } from "../utils/interfaces";
import { NextFunction, Request, Response } from "express";
import { Exception } from "../utils/classes";
import { getUserRole } from "../services/roles";

export async function checkUserRole(this: IRoleName, req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        const userRole = await getUserRole(user.id);
        if(userRole === this.roleName)
            next();
        else
            next(new Exception(400, `User must have role: ${ this.roleName }`));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user role"));
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
            next(new Exception(500, "Can`t check description"));
    }
}
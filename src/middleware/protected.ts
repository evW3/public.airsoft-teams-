import { getUserRole } from "../services/roles"
import { isRoleHavePermission } from "../services/rolePermissions";
import { Response, Request, NextFunction } from "express";
import { IThisProtected } from "../utils/interfaces";
import { Exception, User } from "../utils/classes";

export async function checkPermission(this: IThisProtected, req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.userId;
        const role = await getUserRole(user.id);
        if(role && await isRoleHavePermission(role, this.permission)) {
            req.body = { ...req.body, userObject: user };
            next();
        } else {
            next(new Exception(403, "Permission denied"));
        }
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check permissions"));
    }
}
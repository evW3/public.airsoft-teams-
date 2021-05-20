import { getUserRole } from "../services/roles"
import { isRoleHavePermission } from "../services/rolePermissions";
import { Response, Request, NextFunction } from "express";
import { IThisProtected } from "../utils/interfaces";

export async function checkPermission(this: IThisProtected, req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    const role = await getUserRole({ id: userId });
    if(role && await isRoleHavePermission(role, this.permission)) {
        next();
    } else {
        res.status(403).json({ message: "Protected rout" });
    }
}
import { getUserRole } from "../services/roles"
import { isRoleHavePermission } from "../services/rolePermissions";
import { Response, Request, NextFunction } from "express";

export async function checkPermission(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    const role = await getUserRole({ id: userId });
    if(await isRoleHavePermission(role, req.originalUrl)) {
        next();
    } else {
        res.status(403).json({ message: "Protected rout" });
    }
}
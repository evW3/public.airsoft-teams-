import { getUserRole } from "../services/roles"
import { isRoleHavePermission } from "../services/rolePermissions";
import { Response, Request, NextFunction } from "express";

export async function checkPermission() {

    console.log(Object.keys(arguments));
    console.log(this.permission);
    // const { userId } = req.body;
    // const role = await getUserRole({ id: userId });
    // if(role && await isRoleHavePermission(role, this.permission)) {
    //     next();
    // } else {
    //     res.status(403).json({ message: "Protected rout" });
    // }
}
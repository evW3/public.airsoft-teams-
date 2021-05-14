import { NextFunction, Request, Response } from "express";

import { userRoles } from "../utils/enums";
import { getUserRole } from "../services/roles";

export async function checkManagerRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { managerId } = req.body;
        const role = await getUserRole(managerId);
        if(role && role === userRoles.MANAGER){
            next();
        } else
            res.status(400).json({ message: "Can`t find manager" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t check manager role ${ e }` });
    }
}
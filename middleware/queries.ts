import { NextFunction, Request, Response } from "express";

import { isExistQuery } from "../services/queries";
import { statuses, queryTypes, userRoles } from "../utils/enums";
import { getUserRole } from "../services/roles";

export async function createRoleQueryVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body;
        if(!await isExistQuery(userId, queryTypes.CHANGE_ROLE, statuses.PROCESSED)){
            const role = await getUserRole({ id: userId });

            if(role && role === userRoles.MANAGER)
                res.status(400).json({ message: "Ur role already changed" });
            else if (role)
                next();
        } else
            res.status(400).json({ message: "This query already exists" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t verify query ${ e }` });
    }
}
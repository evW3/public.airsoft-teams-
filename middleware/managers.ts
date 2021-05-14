import { NextFunction, Request, Response } from "express";

import { userRoles } from "../utils/enums";
import { getUserRole } from "../services/roles";
import { isExistsUserInBlockList } from "../services/blockList";

export async function checkManagerRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { managerId } = req.body;
        const role = await getUserRole({ id: managerId });
        if(role && role === userRoles.MANAGER) {
            next();
        } else
            res.status(400).json({ message: "Can`t find manager" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t check manager role ${ e }` });
    }
}

export async function getIdFromParams(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const reqBody = req.body;
        if(id) {
            req.body = { ...reqBody, managerId: id };
            next()
        } else
            res.status(400).json({ message: "Id can`t be empty" })
    } catch (e) {
        res.status(500).json({ message: `Can\`t get id from params`})
    }
}

export async function blockManagerVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const { managerId } = req.body;
        if(!await isExistsUserInBlockList(managerId)) {
            next();
        } else
            res.status(400).json({ message: "This user already banned" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t block manager ${ e }` });
    }
}

export async function unblockManagerVerify(req: Request, res: Response, next: NextFunction) {
    try {
         const { managerId } = req.body;
         if(await isExistsUserInBlockList(managerId)) {
             next();
         } else
             res.status(400).json({ message: "User not found in ban list" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t unblock manager ${ e }` });
    }
}
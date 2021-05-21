import { NextFunction, Request, Response } from "express";

import {getUsersByRole, changeUserRole, getUser, getEmailByUserId} from "../services/users"
import { changeQueryStatus } from "../services/queries";
import { statuses, userRoles } from "../utils/enums";
import { getIdRole } from "../services/roles";
import { blockUser, unblockUser } from "../services/blockList";
import { createComment } from "../services/comments";
import { createQueriesComments } from "../services/queriesComments";
import { Exception } from "../utils/classes";
import {sendSimpleMail} from "../utils/smtp";

export async function acceptManager(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId, userId } = req.body;
        await changeQueryStatus(queryId, statuses.ACCEPTED);
        const roleId = await getIdRole(userRoles.MANAGER);
        if(roleId) {
            await changeUserRole(roleId, userId);
            res.status(200).json({ message: "Manager role was changed" });
        }
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t change manager activation "));
    }
}

export async function declineManager(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId, description } = req.body;
        await changeQueryStatus(queryId, statuses.DECLINE);
        const commentId = await createComment(description);
        await createQueriesComments(queryId, commentId);
        res.status(200).json({ message: "Manager query status was changed" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t change manager activation "));
    }
}

export async function getManagers(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await getUsersByRole(userRoles.MANAGER));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get manager info "));
    }
}

export async function getManagerById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body;
        res.status(200).json(await  getUser(id));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get manager "));
    }
}

export async function blockManager(req: Request, res: Response, next: NextFunction) {
    try {
        const { managerId, description } = req.body;
        const email = await getEmailByUserId(managerId);
        await blockUser(managerId, description);
        await sendSimpleMail(description, "Blocked account", email);
        res.status(200).json({ message: "Manager was blocked" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t block manager"));
    }
}

export async function unblockManager(req: Request, res: Response, next: NextFunction) {
    try {
        const { managerId, description} = req.body;
        await unblockUser(managerId);
        const email = await getEmailByUserId(managerId);
        await sendSimpleMail(description, "Unblocked account", email);
        res.status(200).json({ message: "Manager was unblock" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t unblock manager"));
    }
}
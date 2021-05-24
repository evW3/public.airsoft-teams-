import { NextFunction, Request, Response } from "express";

import {getUsersByRole, changeUserRole, getUser, getEmailByUserId} from "../services/users"
import { changeQueryStatus } from "../services/queries";
import { statuses, userRoles } from "../utils/enums";
import { getIdRole } from "../services/roles";
import { blockUser, unblockUser } from "../services/blockList";
import { createComment } from "../services/comments";
import { createQueriesComments } from "../services/queriesComments";
import { Exception } from "../utils/classes";
import { sendSimpleMail } from "../utils/smtp";

export async function acceptManager(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId } = req.body;
        const user = req.body.userObject;
        await changeQueryStatus(queryId, statuses.ACCEPTED);
        const roleId = await getIdRole(userRoles.MANAGER);
        if(roleId) {
            await changeUserRole(roleId, user.id);
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
        const managers = await getUsersByRole(userRoles.MANAGER);
        res.status(200).json(managers);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get manager info "));
    }
}

export async function getManagerById(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        const userInfo = await getUser(user.id);
        res.status(200).json(userInfo);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get manager "));
    }
}

export async function blockManager(req: Request, res: Response, next: NextFunction) {
    try {
        const { description } = req.body;
        const user = req.body.userObject;
        const email = await getEmailByUserId(user.id);
        await blockUser(user.id, description);
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
        const { description} = req.body;
        const user = req.body.userObject;
        await unblockUser(user.id);
        const email = await getEmailByUserId(user.id);
        await sendSimpleMail(description, "Unblocked account", email);
        res.status(200).json({ message: "Manager was unblock" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t unblock manager"));
    }
}
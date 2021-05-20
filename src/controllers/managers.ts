import { Request, Response } from "express";

import { getUsersByRole, changeUserRole, getUser } from "../services/users"
import { changeQueryStatus } from "../services/queries";
import { statuses, userRoles } from "../utils/enums";
import { getIdRole } from "../services/roles";
import { blockUser, unblockUser } from "../services/blockList";
import { createComment } from "../services/comments";
import { createQueriesComments } from "../services/queriesComments";

export async function acceptManager(req: Request, res: Response) {
    try {
        const { queryId, userId } = req.body;
        await changeQueryStatus(queryId, statuses.ACCEPTED);
        const roleId = await getIdRole(userRoles.MANAGER);
        if(roleId) {
            await changeUserRole(roleId, userId);
            res.status(200).json({ message: "Manager role was changed" });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t change manager activation ${ e }` });
    }
}

export async function declineManager(req: Request, res: Response) {
    try {
        const { queryId, description } = req.body;
        await changeQueryStatus(queryId, statuses.DECLINE);
        const commentId = await createComment(description);
        await createQueriesComments(queryId, commentId);
        res.status(200).json({ message: "Manager query status was changed" });
    } catch (e) {
        res.status(500).json({ error: `Can\`t change manager activation ${ e }` });
    }
}

export async function getManagers(req: Request, res: Response) {
    try {
        res.status(200).json({ managers: await getUsersByRole(userRoles.MANAGER) });
    } catch (e) {
        res.status(500).json({ error: `Can\`t get manager info ${ e }` });
    }
}

export async function getManagerById(req: Request, res: Response) {
    try {
        const { managerId } = req.body;
        res.status(200).json(await  getUser(managerId));
    } catch (e) {
        res.status(500).json({ message: `Can\`t get manager ${ e } ` });
    }
}

export async function blockManager(req: Request, res: Response) {
    try {
        const { managerId, description } = req.body;
        await blockUser(managerId, description);
        res.status(200).json({ message: "Manager was blocked" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t block manager`});
    }
}

export async function unblockManager(req: Request, res: Response) {
    try {
        const { managerId } = req.body;
        await unblockUser(managerId);
        res.status(200).json({ message: "Manager was unblock" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t unblock manager`});
    }
}
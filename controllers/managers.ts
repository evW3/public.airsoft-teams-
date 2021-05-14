import * as express from "express";

import { getUsersByRole, changeUserRole } from "../services/users"
import { changeQueryStatus } from "../services/queries";
import { statuses, userRoles } from "../utils/enums";
import { getIdRole } from "../services/roles";

export async function activateManager(req: express.Request, res: express.Response) {
    try {
        const { queryId, userId } = req.body;
        await changeQueryStatus(queryId, statuses.ACCEPTED);
        const roleId = await getIdRole(userRoles.MANAGER);
        if(roleId) {
            await changeUserRole(roleId, userId);
            res.status(200).json({ message: "Manager activation was changed" });
        }
    } catch (e) {
        res.status(500).json({ error: `Can\`t change manager activation ${ e }` });
    }
}

export async function getManagersInfo(req: express.Request, res: express.Response) {
    try {
        const { role } = req.body;
        if(role)
            res.status(200).json({ managers: await getUsersByRole(role) });
    } catch (e) {
        res.status(500).json({ error: `Can\`t get manager info ${ e }` });
    }
}
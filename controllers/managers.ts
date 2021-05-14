import * as express from "express";

import { changeActivation, getUsersByRole } from "../services/users"

export async function activateManager(req: express.Request, res: express.Response) {
    try {
        const { managerId, activation } = req.body;
        if(managerId && activation) {
            await changeActivation(managerId, activation);
            res.status(200).json({ message: "Manager activation was changed" });
        } else {
            res.status(400).json({ message: "Can`t change manager activation" });
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
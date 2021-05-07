import * as express from "express";
import { changeActivation, getUsersByRole } from "../services/users"

export async function activateManager(req: express.Request, res: express.Response) {
    try {
        const { managerId, activation } = req.body;
        await changeActivation(managerId, activation);
    } catch (e) {
        res.status(500).json({ error: `Can\`t activate user ${ e }` });
    }
}

export async function getManagersInfo(req: express.Request, res: express.Response) {
    try {
        const { role } = req.body;
        res.status(200).json({ managers: await getUsersByRole(role) });
    } catch (e) {
        res.status(500).json({ error: `Can\`t activate user ${ e }` });
    }
}
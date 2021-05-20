import { Request, Response } from "express";
import { createQuery } from "../services/queries";
import { queryTypes, statuses } from "../utils/enums";

export async function createRoleQuery(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        await createQuery({ type: queryTypes.CHANGE_ROLE, status: statuses.PROCESSED, userId });
        res.status(200).json({ message: "Query create successfully" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t create query ${ e }` });
    }
}

export async function createEnterTeamQuery(req: Request, res: Response) {
    try {
        const { userId, params } = req.body;
        await createQuery({ type: queryTypes.ENTER_TEAM, status: statuses.PROCESSED, userId });
        res.status(200).json({ message: "Query create successfully" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t ` })
    }
}
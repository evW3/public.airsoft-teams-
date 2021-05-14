import * as express from "express";
import { createQuery, isExistQuery } from "../services/queries";
import { queryTypes, statuses } from "../utils/enums";

export async function createRoleQuery(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.body;
        await createQuery({ type: queryTypes.CHANGE_ROLE, status: statuses.PROCESSED, userId });
        res.status(200).json({ message: "Query create successfully" });
    } catch (e) {
        res.status(500).json({ message: `Can\`t create query ${ e }` });
    }
}
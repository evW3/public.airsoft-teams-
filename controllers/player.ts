import * as express from "express";

import { getPlayerInfo } from "../services/users";

export async function getPlayerProfile(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.body;
        res.status(200).json({ user: await getPlayerInfo(userId) });
    } catch (e) {
        res.status(500).json({ message: `Can\`t get player profile ${ e }` });
    }
}
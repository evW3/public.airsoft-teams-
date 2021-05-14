import * as express from "express";

import { createTeam, isExistTeam } from "../services/teams";

export async function registerTeam(req: express.Request, res: express.Response) {
    try {
        const { name } = req.body;
        if(name) {
            if(!await isExistTeam(name)) {
                await createTeam(name);
                res.status(200).json({ message: "Team create successfully" });
            } else
                res.status(400).json({ message: "Team with this name already exists" });
        } else
            res.status(400).json({ message: "Teams name can`t be empty" });
    } catch (e) {
        res.status(500).json({ error: `Can\`t create team ${ e }` });
    }
}
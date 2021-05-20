import { Response, Request, NextFunction } from "express";

import { createTeam, isExistTeam } from "../services/teams";
import { Exception, Team } from "../utils/classes";

export async function registerTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const team = new Team();
        team.name = req.body.name;
        if(!await isExistTeam(team.name)) {
            await createTeam(team.name);
            res.status(200).json({ message: "Team create successfully" });
        } else
            next(new Exception(400, "Team with this name already exists"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t create team"));
    }
}
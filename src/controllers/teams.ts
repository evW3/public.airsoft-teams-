import { Response, Request, NextFunction } from "express";

import { createTeam, getTeamMembers, isExistTeam } from "../services/teams";
import { Exception, Team } from "../utils/classes";
import {getUsersInTeam} from "../services/users";

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

export async function getTeamPlayers(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const teamMembers = await getTeamMembers(name);
        res.status(200).json(teamMembers);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get team members"));
    }
}

export async function getPlayersWhoIntoTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const playersInTeams = await getUsersInTeam();
        res.status(200).json(playersInTeams);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get players"));
    }
}
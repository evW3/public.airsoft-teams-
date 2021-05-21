import { NextFunction, Request, Response } from "express";
import { changeQueryStatus } from "../services/queries";
import { statuses } from "../utils/enums";
import { Exception } from "../utils/classes";
import {createTeamMember, deleteTeamMember} from "../services/teamMembers";
import { getQueryParameter } from "../services/queryParams";
import { createComment } from "../services/comments";
import { createQueriesComments } from "../services/queriesComments";

export async function acceptJoinTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId, playerId } = req.body;
        const param = JSON.parse(((await getQueryParameter(queryId)).parameter));
        if(param.teamId) {
            await createTeamMember(playerId, param.teamId);
            await changeQueryStatus(queryId, statuses.ACCEPTED);
            res.status(200).json({ message: "Moved player successfully" });
        } else
            next(new Exception(400, "Can`t parse query parameter"))
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t accept player query"));
    }
}

export async function declineJoinTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId, description } = req.body;
        const commentId = await createComment(description);
        await createQueriesComments(queryId, commentId);
        await changeQueryStatus(queryId, statuses.DECLINE);
        res.status(200).json({ message: "Player query was declined" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t decline player query"));
    }
}

export async function exitFromTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { playerId } = req.body;
        await deleteTeamMember(playerId);
        res.status(200).json({ message: "Player successfully moved" })
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t move out player"));
    }
}
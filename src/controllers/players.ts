import { NextFunction, Request, Response } from "express";
import { changeQueryStatus } from "../services/queries";
import { statuses } from "../utils/enums";
import { Exception, User } from "../utils/classes";
import { createTeamMember, deleteTeamMember } from "../services/teamMembers";
import { getQueryParameter } from "../services/queryParams";
import { createComment } from "../services/comments";
import { createQueriesComments } from "../services/queriesComments";
import { getEmailByUserId, getUser } from "../services/users";
import { sendSimpleMail } from "../utils/smtp";
import { blockUser, unblockUser } from "../services/blockList";

export async function acceptJoinTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId } = req.body;
        const user = req.body.userObject;
        const param = JSON.parse(((await getQueryParameter(queryId)).parameter));
        if(param.teamId) {
            await createTeamMember(user.id, param.teamId);
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

export async function acceptExitFromTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId } = req.body;
        const user = req.body.userObject;
        await changeQueryStatus(queryId, statuses.ACCEPTED);
        await deleteTeamMember(user.id);
        res.status(200).json({ message: "Player successfully moved" })
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t accept user query"));
    }
}

export async function declineExitFromTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId } = req.body;
        await changeQueryStatus(queryId, statuses.DECLINE);
        res.status(200).json({ message: "Query successfully declined" });
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t decline user query"));
    }
}

export async function removePlayerFromTeam(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        const { description } = req.body;
        user.email = await getEmailByUserId(user.id);
        await deleteTeamMember(user.id);
        res.status(200).json({ message: "Player successfully moved" });
        await sendSimpleMail(`${ description }`, "Исключение из команды", user.email);
    } catch (e) {
        console.log(e);
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t remove user from team"));
    }
}

export async function getPlayerById(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body.userObject;
        res.status(200).json(await getUser(user.id));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t get user by id"));
    }
}

export async function blockPlayer(req: Request, res: Response, next: NextFunction) {
    try {
        const { description } = req.body;
        const user = req.body.userObject;
        user.email = await getEmailByUserId(user.id);
        await blockUser(user.id, description);
        res.status(200).json({ message: "Player was blocked" });
        await sendSimpleMail(description, "Blocked account", user.email);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t block player"));
    }
}

export async function unBlockPlayer(req: Request, res: Response, next: NextFunction) {
    try {
        const { description } = req.body;
        const user = req.body.userObject;
        await unblockUser(user.id);
        const email = await getEmailByUserId(user.id);
        res.status(200).json({ message: "Player was unblock" });
        await sendSimpleMail(description, "Unblocked account", email);
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t unblock player"));
    }
}
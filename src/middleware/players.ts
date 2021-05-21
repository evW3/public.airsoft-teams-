import { NextFunction, Request, Response } from "express";
import {Exception, Query, User} from "../utils/classes";
import { getUserIdByQueryId } from "../services/users";
import {statuses, userRoles} from "../utils/enums";
import { isExistQuery } from "../services/queries";
import {IThisQueryType} from "../utils/interfaces";
import {getUserRole} from "../services/roles";
import {isExistsUserInBlockList} from "../services/blockList";

export async function getPlayerIdByQueryId(req: Request, res: Response, next: NextFunction) {
    try {
        const { queryId } = req.body;
        if(queryId && typeof queryId === "number") {
            const playerId = await getUserIdByQueryId(queryId);
            if(playerId) {
                req.body = { ...req.body, playerId };
                next();
            } else
                next(new Exception(400, "Can`t find user query"));
        } else
            next(new Exception(400, "Parameters isn`t valid"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t getPlayerIdByQueryId"));
    }
}

export async function isExistsQueryVerify(this: IThisQueryType, req: Request, res: Response, next: NextFunction) {
    try {
        const query = new Query();

        query.userId = req.body.playerId;
        query.type = this.queryType;
        query.id = req.body.queryId;
        query.status = statuses.PROCESSED;

        if(await isExistQuery(query)) {
            next();
        } else
            next(new Exception(400, "Can`t find query"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t getPlayerIdByQueryId"));
    }
}

export async function checkDescription(req: Request, res: Response, next: NextFunction) {
    try {
        const { description } = req.body;
        if(description && typeof description === "string")
            next();
        else
            next(new Exception(400, "Parameters isn`t valid"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check description"));
    }
}

export async function isTheSamePlayer(req: Request, res: Response, next: NextFunction) {
    try {
        const { playerId, userId } = req.body;
        if(userRoles.PLAYER === await getUserRole(userId)) {
            if(playerId === userId)
                next();
            else
                next(new Exception(403, "Can`t change user query status"));
        } else
            next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user"));
    }
}

export async function checkPlayerRole(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.playerId;
        if(userRoles.PLAYER === await getUserRole(user.id))
            next();
        else
            next(new Exception(400, "Can`t find player"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check player role"));
    }
}

export async function isNotUserInBlockList(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.id;
        if(!(await isExistsUserInBlockList(user.id)))
            next();
        else
            next(new Exception(400, "User already banned"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user in block list"));
    }
}

export async function isUserInBlockList(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.id;
        if(await isExistsUserInBlockList(user.id))
            next();
        else
            next(new Exception(400, "Can`t find user in block list"));
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user in block list"));
    }
}

export async function playerConcatenateId(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User();
        user.id = req.body.playerId;
        req.body = { ...req.body, id: user.id };
        next();
    } catch (e) {
        if(e instanceof Exception)
            next(e);
        else
            next(new Exception(500, "Can`t check user in block list"));
    }
}
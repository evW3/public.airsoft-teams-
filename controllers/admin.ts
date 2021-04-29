import * as express from "express";

//import {  } from "../services/users";

export async function activateUser(req: express.Request, res: express.Response) {
    try {
        //const { userId }
    } catch (e) {
        res.status(500).json({ error: `Can\`t activate user ${ e }` });
    }
}
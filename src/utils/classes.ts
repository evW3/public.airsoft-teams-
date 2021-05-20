import * as express from "express";

export class Photo {
    imagePathToLoad: string;
    name: string;
    url: string;
    fullFilePathToWrite: string;
    uniqueName: string;

    constructor() {
        this.imagePathToLoad = "";
        this.name = "";
        this.url = "";
        this.fullFilePathToWrite = "";
        this.uniqueName = "";
    }

    isValid(): boolean {
        return !!(this.imagePathToLoad && this.name);
    }
}

export class UserInfo {
    id: number;
    login: string;
    email: string;
    password: string;

    constructor() {
        this.id = 0;
        this.login = "";
        this.email = "";
        this.password = "";
    }

    isValid(): boolean {
        return this.id !== 0;
    }
}

export class Response {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }

    sendResponse(res: express.Response) {
        res.status(this.status).json({ message: this.message });
    }
}

export class HttpException {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}
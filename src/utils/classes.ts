import {log} from "util";
import {strict} from "assert";
import {TokenExpiredError} from "jsonwebtoken";

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

export class User {
    private _id: number;
    private _login: string;
    private _email: string;
    private _password: string;
    private _passwordSalt: string;
    private _profileImage: string;
    private _roleId: number;

    set id(id: number) {
        if(typeof id === "number") {
            this._id = id;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set login(login: string) {
        if(typeof login === "string") {
            this._login = login;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set email(email: string) {
        if(typeof email === "string") {
            this._email = email;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set password(password: string) {
        if(typeof password === "string") {
            this._password = password;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set passwordSalt(passwordSalt: string) {
        if(typeof passwordSalt === "string") {
            this._passwordSalt = passwordSalt;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set profileImage(profileImage: string) {
        if(typeof profileImage === "string") {
            this._profileImage = profileImage;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set roleId(roleId: number) {
        if(typeof roleId === "number") {
            this._roleId = roleId;
        } else
            throw new Exception(400, "Parameters isn`t valid");
    }

    get id() {
        return this._id;
    }
    get login() {
        return this._login;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get passwordSalt() {
        return this._passwordSalt;
    }
    get profileImage() {
        return this._profileImage;
    }
    get roleId() {
        return this._roleId;
    }

    isValid(): boolean {
        return this.id !== 0;
    }

    createUserObject(): object {
        return {
            password: this.password,
            password_salt: this.passwordSalt,
            email: this.email,
            roleId: this.roleId
        }
    }
}

export class Device {
    private _ip: string;
    private _browser: string;

    set ip(ip: string) {
        if(typeof ip === "string") {
            this._ip = ip;
        }
        throw new Exception(400, "Parameters isn`t valid");
    }

    set browser(browser: string) {
        if(typeof browser === "string") {
            this._browser = browser;
        }
        throw new Exception(400, "Parameters isn`t valid");
    }

    createDeviceObject(): object {
        return {
            ip: this._ip,
            browser: this._browser
        }
    }
}

export class VerificationCode {
    private _code: string;

    set code(code: string) {
        if(typeof code === "string")
            this._code = code;
        else
            throw new Exception(400, "Parameters isn`t valid");
    }
}

export class Team {
    private _name: string;

    set name(name: string) {
        if(typeof name === "string")
            this._name = name
        else
            throw new Exception(400,"Parameters isn`t valid");
    }

    get name() {
        return this._name;
    }
}

export class Query {
    private _status: string;
    private _type: string;
    private _userId: number;

    set status(status: string){
        if(typeof status === "string")
            this._status = status;
        else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set type(type: string){
        if(typeof type === "string")
            this._type = type;
        else
            throw new Exception(400, "Parameters isn`t valid");
    }
    set userId(userId: number){
        if(typeof userId === "number")
            this._userId = userId;
        else
            throw new Exception(400, "Parameters isn`t valid");
    }

    get status() {
        return this._status;
    }
    get type() {
        return this._type;
    }
    get userId() {
        return this._userId;
    }

    createQueryObject() {
        return {
            status: this._status,
            type: this._type,
            userId: this._userId
        }

    }
}

export class Exception {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}
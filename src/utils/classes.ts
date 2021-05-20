import {log} from "util";
import {strict} from "assert";

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
            throw "Parameters isn`t valid";
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
            throw "Parameters isn`t valid";
    }
    set passwordSalt(passwordSalt: string) {
        if(typeof passwordSalt === "string") {
            this._passwordSalt = passwordSalt;
        } else
            throw "Parameters isn`t valid";
    }
    set profileImage(profileImage: string) {
        if(typeof profileImage === "string") {
            this._profileImage = profileImage;
        } else
            throw "Parameters isn`t valid";
    }
    set roleId(roleId: number) {
        if(typeof roleId === "number") {
            this._roleId = roleId;
        } else
            throw "Parameters isn`t valid";
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
        throw "Parameters isn`t valid";
    }

    set browser(browser: string) {
        if(typeof browser === "string") {
            this._browser = browser;
        }
        throw new Exception(400, "Parameters isn`t valid");
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
import { Model } from "./BaseDB";
import {Mode} from "fs";

export interface IBcrypt {
    saltRounds: number,
    globalSalt: string
}

export interface ISMTP {
    email: string,
    password: string
}

export interface IDatabase {
    name: string,
    port: number,
    host: string,
    login: string,
    password: string
}

export interface IToken {
    secretKey: string,
    expiresIn: string,
    codesKey: string,
    codesExpiresIn: string
}

export interface ICodeTokenBody {
    userId: number,
    ip?: string,
    browser?: string,
    code: string
}

export interface IDefaultTokenBody {
    userId: number
}

export interface IDevices extends Model {
    id: number;
    ip: string;
    browser: string;
}

export interface IPermissions extends Model {
    id: number,
    name: string
}

export interface IRolePermissions extends Model {
    roleId: number;
    permissionId: number;
}

export interface IRoles extends Model {
    id: number,
    name: string
}

export interface IUsers extends Model {
    id: number,
    email: string,
    password: string,
    password_salt: string,
    login: string,
    profile_image: string
}

export interface IVerificationCodes extends Model {
    id: number;
    code: string;
}

export interface IQueries extends Model {
    id: number,
    type: string,
    status: string
}

export interface IComments extends Model {
    id: number,
    description: string
}

export interface IBlockList extends Model {
    userId: number,
    commentId: number
}

export interface ITeams extends Model {
    id: number,
    name: string
}

export interface IQueriesComments extends Model {
    queryId: number,
    commentId: number
}

export interface IKeyValue {
    [key: string]: string[]
}

export interface IRolesConstant {
    PLAYER: string,
    MANAGER: string
}

export interface IThisProtected {
    permission: string
}

export interface IUser {
    login?: string,
    password?: string,
    password_salt?: string,
    profile_image?: string
}
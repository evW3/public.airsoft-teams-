import {IRolesConstant} from "./interfaces";

export enum statuses {
    PROCESSED = 'PROCESSED',
    ACCEPTED = 'ACCEPTED',
    DECLINE = 'DECLINE'
}

export enum queryTypes {
    CHANGE_ROLE = 'CHANGE_ROLE'
}

export enum userRoles {
    PLAYER = "PLAYER",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN"
}
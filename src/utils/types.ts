import {ITeams, IUsers} from "./interfaces";

export type adminObject = {
    email: string,
    password: string
}

export type customIUser = IUsers & {
    role?: {
        name: string
    },
    teams?: []
};

export type customITeams = ITeams & {
    login?: string,
    email?: string
}
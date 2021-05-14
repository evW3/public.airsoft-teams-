import {Teams, Users} from "../models/relations";

export async function createTeam(name: string) {
    await Teams.create({ name });
}

export async function isExistTeam(name: string): Promise<boolean> {
    return await Teams.count({ where: { name } }) !== 0;
}

export async function isTeamHaveUser(userId: number): Promise<boolean> {
    return await Teams.count({ include: { model: Users, where: { id: userId } } }) !== 0;
}
import { Teams } from "../models/relations";

export async function createTeam(name: string) {
    await Teams.create({ name });
}

export async function isExistTeam(name: string): Promise<boolean> {
    return await Teams.count({ where: { name } }) !== 0;
}
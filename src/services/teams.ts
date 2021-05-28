import { Teams, Users } from "../models/relations";
import {ITeams} from "../utils/interfaces";

export async function createTeam(name: string): Promise<void> {
    await Teams.create({ name });
}

export async function isExistTeam(name: string): Promise<boolean> {
    return await Teams.count({ where: { name } }) !== 0;
}

export async function isExistTeamById(id: number): Promise<boolean> {
    return await Teams.count({ where: { id } }) !== 0;
}

export async function getTeamMembers(id: number): Promise<ITeams> {
    return await Teams.findOne({ attributes:['name'], where: { id }, include: [{ model: Users, attributes: ['login', 'email'] }] });
}
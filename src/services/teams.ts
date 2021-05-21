import { Teams, Users } from "../models/relations";

export async function createTeam(name: string) {
    await Teams.create({ name });
}

export async function isExistTeam(name: string): Promise<boolean> {
    return await Teams.count({ where: { name } }) !== 0;
}

export async function getTeamNameByUserId(id: number) {
    return Teams.findOne({ attributes: ['name'], include:[{ model: Users, where: { id }, attributes: [] }] });
}

export async function isExistTeamById(id: number): Promise<boolean> {
    return await Teams.count({ where: { id } }) !== 0;
}

export async function getTeamMembers(name: string) {
    return await Teams.findAll({ attributes:['name'], include: [{ model: Users, attributes: ['login', 'email'] }] });
}
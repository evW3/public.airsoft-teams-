import { Roles, Users } from "../models/relations";

export async function getRoleIdByName(name: string): Promise<number | null> {
    const role = await Roles.findOne({ where: { name }, attributes: ['id'] ,raw: true });
    if(!role)
        return null;
    return role.id;
}

export async function getUserRole(user: object): Promise<string | null> {
    const userData = await Roles.findOne({ attributes: ['name'], include: { model: Users, where: user, attributes: [] }, raw: true });
    if(!userData)
        return null;
    return userData.name;
}

export async function getIdRole(name: string): Promise<number | null> {
    const role = await Roles.findOne({ where: { name }, attributes: ['id'] });
    if(!role)
        return null
    return role.id;
}
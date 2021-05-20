import { Roles, Users } from "../models/relations";
import { User } from "../utils/classes";

export async function getRoleIdByName(name: string): Promise<number | null> {
    const role = await Roles.findOne({ where: { name }, attributes: ['id'] ,raw: true });
    if(!role)
        return null;
    return role.id;
}

export async function getUserRole(id: number): Promise<string | null> {
    const userData = await Roles.findOne({ attributes: ['name'], include: { model: Users, where: { id }, attributes: [] }, raw: true });
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
import { Roles, Users } from "../models/relations";

export async function getRoleIdByName(name: string): Promise<number> {
    const role: any = await Roles.findOne({ where: { name }, attributes: ['id'] ,raw: true });
    return role.id;
}

export async function getUserRole(user: any): Promise<string> {
    const userData: any = await Roles.findOne({ attributes: ['name'], include: { model: Users, where: user, attributes: [] }, raw: true });
    return userData.name;
}
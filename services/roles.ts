import {Roles, Users} from "../models/relations";

export async function getRoleIdByName(name: string): Promise<number> {
    const role: any = await Roles.findOne({ where: { name }, attributes: ['id'] ,raw: true });
    return role.id;
}

export async function getUserRole(email: string): Promise<string> {
    const user: any = await Roles.findOne({ attributes: ['name'], include: { model: Users, where: { email }, attributes: [] }, raw: true });
    return user.name;
}
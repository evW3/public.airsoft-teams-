import { Roles } from "../models/relations";

export async function getRoleIdByName(name: string): Promise<number> {
    const role: any = await Roles.findOne({ where: { name }, attributes: ['id'] ,raw: true });
    return role.id;
}
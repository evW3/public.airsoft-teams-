import { Roles, Permissions } from "../models/relations";

export async function isRoleHavePermission(role: string, permission: string): Promise<boolean> {
    return await Roles.count({
        where: { name: role },
        include: {
            model: Permissions,
            where: { name: permission }
        }
    }) !== 0;
}
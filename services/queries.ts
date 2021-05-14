import { Queries, Users } from "../models/relations";

export async function createQuery(query: object) {
    await Queries.create(query);
}

export async function isExistQuery(userId: number, type: string, status: string): Promise<boolean> {
    return await Queries.count({ where: { type, status }, include: [{ model: Users, where: { id: userId } }] }) !== 0;
}

export async function changeQueryStatus(id: number, status: string) {
    await Queries.update({ status }, { where: { id } });
}
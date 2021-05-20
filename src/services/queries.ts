import { Queries, Users } from "../models/relations";
import { Query } from "../utils/classes";

export async function createQuery(query: Query): Promise<number> {
    const queryInfo = await Queries.create(query.createQueryObject());
    return queryInfo.id;
}

export async function isExistQuery(userId: number, type: string, status: string): Promise<boolean> {
    return await Queries.count({ where: { type, status }, include: [{ model: Users, where: { id: userId } }] }) !== 0;
}

export async function changeQueryStatus(id: number, status: string) {
    await Queries.update({ status }, { where: { id } });
}
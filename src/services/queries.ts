import { Queries, Users } from "../models/relations";
import { Query } from "../utils/classes";

export async function createQuery(query: Query): Promise<number> {
    const queryInfo = await Queries.create(query.createQueryObject());
    return queryInfo.id;
}

export async function isExistQuery(query: Query): Promise<boolean> {
    return await Queries.count({ where: { type: query.type, status: query.status, id: query.id }, include: [{ model: Users, where: { id: query.userId } }] }) !== 0;
}

export async function isQueryUnique(query: Query): Promise<boolean> {
    return await Queries.count({ where: { type: query.type, status: query.status }, include: [{ model: Users, where: { id: query.userId } }] }) === 0;
}

export async function changeQueryStatus(id: number, status: string): Promise<void> {
    await Queries.update({ status }, { where: { id } });
}

export async function findQueries(status: string, limit: number, offset: number) {
    return await Queries.findAll({
        where: { status }
    });
}
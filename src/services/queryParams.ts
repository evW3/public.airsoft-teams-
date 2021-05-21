import { QueryParams } from "../models/relations";

export async function createQueryParameter(parameter: string, queryId: number) {
    await QueryParams.create({ parameter, queryId });
}

export async function getQueryParameter(queryId: number) {
    return await QueryParams.findOne({ where: { queryId } });
}
import { QueryParams } from "../models/relations";
import { IQueryParams } from "../utils/interfaces";

export async function createQueryParameter(parameter: string, queryId: number): Promise<void> {
    await QueryParams.create({ parameter, queryId });
}

export async function getQueryParameter(queryId: number): Promise<IQueryParams> {
    return await QueryParams.findOne({ where: { queryId } });
}
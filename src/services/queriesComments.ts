import { QueriesComments } from "../models/relations";

export async function createQueriesComments(queryId: number, commentId: number): Promise<void> {
    await QueriesComments.create({ queryId, commentId });
}
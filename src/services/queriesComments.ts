import { QueriesComments } from "../models/relations";

export async function createQueriesComments(queryId: number, commentId: number) {
    await QueriesComments.create({ queryId, commentId });
}
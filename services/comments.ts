import { Comments } from "../models/relations";

export async function createComment(description: string): Promise<number> {
    const comment = await Comments.create({ description });
    return comment.id;
}
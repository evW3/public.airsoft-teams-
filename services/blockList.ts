import { BlockList } from "../models/relations";

export async function blockUser(userId: number, commentId: number) {
    await BlockList.create({ userId, commentId });
}

export async function unblockUser(userId: number) {
    await BlockList.destroy({ where: { userId } });
}
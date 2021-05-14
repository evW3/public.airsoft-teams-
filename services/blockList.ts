import { BlockList } from "../models/relations";

export async function blockUser(userId: number, description: string) {
    await BlockList.create({ userId, description });
}

export async function unblockUser(userId: number) {
    await BlockList.destroy({ where: { userId } });
}

export async function isExistsUserInBlockList(userId: number): Promise<boolean> {
    return await BlockList.count({ where: { userId } }) !== 0;
}
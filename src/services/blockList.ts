import { BlockList } from "../models/relations";

export async function blockUser(userId: number, description: string): Promise<void> {
    await BlockList.create({ userId, description });
}

export async function unblockUser(userId: number): Promise<void> {
    await BlockList.destroy({ where: { userId } });
}

export async function isExistsUserInBlockList(userId: number): Promise<boolean> {
    return await BlockList.count({ where: { userId } }) !== 0;
}

export async function getBlockDescription(userId: number): Promise<string | null> {
    const blockedUser = await BlockList.findOne({ where: { userId } });
    if(!blockedUser)
        return null;
    return blockedUser.description;
}
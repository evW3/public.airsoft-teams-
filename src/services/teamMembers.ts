import { TeamMembers } from "../models/relations";

export async function createTeamMember(userId: number, teamId: number ) {
    await TeamMembers.create({ userId, teamId });
}

export async function isPlayerInTeam(userId: number): Promise<boolean> {
    return await TeamMembers.count({ where: { userId } }) !== 0;
}
import {TeamMembers, Teams} from "../models/relations";

export async function createTeamMember(userId: number, teamId: number ): Promise<void> {
    await TeamMembers.create({ userId, teamId });
}

export async function isPlayerInTeam(userId: number): Promise<boolean> {
    return await TeamMembers.count({where: { userId }}) !== 0;
}

export async function deleteTeamMember(userId: number): Promise<void> {
     await TeamMembers.destroy({ where: { userId } });
}
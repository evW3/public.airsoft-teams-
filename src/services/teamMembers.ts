import { Users } from "../models/relations";

export async function createTeamMember(id: number, teamId: number ): Promise<void> {
    await Users.update({ teamId }, { where: { id }});
}

export async function isPlayerInTeam(userId: number): Promise<boolean> {
    const user = await Users.findOne({ where: { userId }, attributes: ['teamId'] });
    if(user.teamId) {
        return true;
    }
    return false;
}

export async function deleteTeamMember(userId: number): Promise<void> {
     await Users.update({ teamId: null },{ where: { userId } });
}
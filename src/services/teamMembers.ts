import { Users } from "../models/relations";

export async function createTeamMember(id: number, teamId: number ): Promise<void> {
    await Users.update({ teamId }, { where: { id }});
}

export async function isPlayerInTeam(id: number): Promise<boolean> {
    const user = await Users.findOne({ where: { id }, attributes: ['teamId'] });
    if(user.teamId) {
        return true;
    }
    return false;
}

export async function deleteTeamMember(id: number): Promise<void> {
     await Users.update({ teamId: null },{ where: { id } });
}
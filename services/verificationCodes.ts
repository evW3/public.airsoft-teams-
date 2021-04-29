import { VerificationCodes } from "../models/relations";
import exp from "constants";

export async function createCode(userId: number): Promise<string> {
    const codeUUID: any = await VerificationCodes.create({ userId });
    return codeUUID.getDataValue('code');
}

export async function clearUserCodes(userId: number) {
    await VerificationCodes.destroy({ where: { userId } });
}
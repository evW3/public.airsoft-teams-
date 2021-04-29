import { VerificationCodes } from "../models/relations";

export async function createCode(userId: number): Promise<string> {
    const codeUUID: any = await VerificationCodes.create({ userId });
    return codeUUID.getDataValue('code');
}
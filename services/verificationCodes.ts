import { VerificationCodes } from "../models/relations";

export async function createCode(userId: number): Promise<string> {
    const verificationCode = await VerificationCodes.create({ userId });
    return verificationCode.code;
}

export async function clearUserCodes(userId: number) {
    await VerificationCodes.destroy({ where: { userId } });
}
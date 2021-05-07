import bcrypt from "bcrypt";
import config from "config";

interface Ibcrypt {
    saltRounds: number,
    globalSalt: string
}

const bcryptInfo: Ibcrypt = config.get('security');

export async function encrypt(weakPassword: string) {
    const salt: string = await bcrypt.genSalt(bcryptInfo.saltRounds);
    const saltPassword: string = weakPassword + bcryptInfo.globalSalt;
    const strongPassword: string = await bcrypt.hash(saltPassword, salt);
    return { strongPassword, salt };
}

export async function encryptBySalt(weakPassword: string, userSalt: string): Promise<string> {
    const saltPassword: string = weakPassword + bcryptInfo.globalSalt;
    return await bcrypt.hash(saltPassword, userSalt);
}
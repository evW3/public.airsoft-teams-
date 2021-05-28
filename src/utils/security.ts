import bcrypt from "bcrypt";
import config from "config";
import { IBcrypt } from "./interfaces";

const bcryptInfo: IBcrypt = config.get('security');

export async function encrypt(weakPassword: string) {
    const salt: string = await bcrypt.genSalt(bcryptInfo.saltRounds);
    const saltPassword: string = weakPassword + bcryptInfo.globalSalt;
    const encryptedPassword: string = await bcrypt.hash(saltPassword, salt);
    return { encryptedPassword, salt };
}

export async function encryptBySalt(weakPassword: string, userSalt: string): Promise<string> {
    const saltPassword: string = weakPassword + bcryptInfo.globalSalt;
    return await bcrypt.hash(saltPassword, userSalt);
}
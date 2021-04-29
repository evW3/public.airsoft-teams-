import { Users } from "../models/relations";

export async function createUser(user: object): Promise<number> {
    const info: any = await Users.create(user);
    return info.getDataValue("id");
}

export async function isEmailExist(email: string): Promise<boolean> {
    return await Users.count({ where: { email } }) !== 0;
}

export async function isUserValid(email: string, password: string): Promise<boolean> {
    return await Users.count({ where: { email, password } }) !== 0;
}

export async function getUserSalt(email: string) {
    return await Users.findOne({ where: { email }, attributes: ['password_salt'], raw: true });
}
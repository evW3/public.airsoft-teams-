import { Users, VerificationCodes } from "../models/relations";

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
    const user: any = await Users.findOne({ where: { email }, attributes: ['password_salt'], raw: true });
    return user.password_salt;
}

export async function getEmailByUserId(id: number): Promise<string> {
    const user: any = await Users.findOne({ where: { id }, raw: true,  attributes: ['email'] });
    return user.email;
}

export async function getIdByEmail(email: string): Promise<number> {
    const user: any = await Users.findOne({ where: { email }, raw: true, attributes: ['id'] });
    return user.id;
}

export async function isUserHasCode(id: string, code: string): Promise<boolean> {
    return await Users.count({
        where: { id },
        include: {
            model: VerificationCodes,
            where: { code }
        }
    }) !== 0;
}

export async function setUserPassword(id: number, password: string) {
    await Users.update({ password },{ where: { id } });
}

export async function isUserActivated(email: string): Promise<boolean> {
    const user: any = await Users.findOne({ where: { email }, raw: true });
    return user.activation;
}
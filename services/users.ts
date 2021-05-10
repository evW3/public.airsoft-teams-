import { Roles, Users, VerificationCodes } from "../models/relations";

export async function createUser(user: object): Promise<number> {
    const userInfo = await Users.create(user);
    return userInfo.id;
}

export async function isEmailExist(email: string): Promise<boolean> {
    return await Users.count({ where: { email } }) !== 0;
}

export async function isUserValid(email: string, password: string): Promise<boolean> {
    return await Users.count({ where: { email, password } }) !== 0;
}

export async function getUserSalt(email: string): Promise<string | null> {
    const user = await Users.findOne({ where: { email }, attributes: ['password_salt'], raw: true });
    if(!user)
        return null;
    return user.password_salt;
}

export async function getEmailByUserId(id: number): Promise<string | null> {
    const user = await Users.findOne({ where: { id }, raw: true,  attributes: ['email'] });
    if(!user)
        return null;
    return user.email;
}

export async function getIdByEmail(email: string): Promise<number | null> {
    const user = await Users.findOne({ where: { email }, raw: true, attributes: ['id'] });
    if(!user)
        return null;
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

export async function setUserPassword(id: number, password: string, password_salt: string) {
    await Users.update({ password, password_salt },{ where: { id } });
}

export async function isUserActivated(email: string): Promise<boolean | null> {
    const user = await Users.findOne({ where: { email }, raw: true });
    if(!user)
        return null;
    return user.activation;
}

export async function changeActivation(id: number, activation: boolean) {
    await Users.update({ activation }, { where: { id } });
}

export async function getUsersByRole(role: string) {
    return await Users.findAll({
        include: { model: Roles, where: { name: role }, attributes:[] },
        attributes: ['email', ],
        raw: true });
}

export async function getUserInfo(id: number) {
    return await Users.findOne({
        where: { id },
        attributes: ['email', 'login', 'profile_image'],
        include: { model: Roles, attributes: ['name'] }
    });
}


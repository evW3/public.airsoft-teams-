import { Roles, VerificationCodes, Teams, Queries, Users } from "../models/relations";
import {User} from "../utils/classes";

export async function createUser(user: User): Promise<number> {
    const userInfo = await Users.create(user.createUserObject());
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

export async function setUserLogin(id: number, login: string) {
    await Users.update({login}, { where: { id } });
}

export async function setUserPhoto(id:number, profile_image: string) {
    await Users.update({ profile_image }, { where: { id } });
}

export async function getUsersByRole(role: string) {
    return await Users.findAll({
        include: { model: Roles, where: { name: role }, attributes: [] },
        attributes: ['email', 'login'],
        raw: true
    });
}

export async function getUser(id: number) {
    return await Users.findOne({
        where: { id },
        attributes: ['email', 'login', 'profile_image'],
        include: [{ model: Roles, attributes: ['name'] }, { model: Teams, attributes: ['name'] }]
    });
}

export async function changeUserRole(roleId: number, id: number) {
    await Users.update({ roleId }, { where: { id } })
}

export async function getUserIdByQueryId(queryId: number): Promise<number | null> {
    const user = await Users.findOne({ attributes: ['id'], include: [{ model: Queries, where: { id: queryId } }] });
    if(!user)
        return null;
    return user.id;
}

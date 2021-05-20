import { Devices } from "../models/relations";

export async function createDevice(ip: string, browser: string, userId: number) {
    await Devices.create({ ip, browser, userId });
}

export async function getUserDevices(userId: number) {
    return Devices.findAll({ where: { userId }, raw: true });
}

export async function isExistDevice(userId: number, ip: string, browser: string): Promise<boolean> {
    return await Devices.count({ where: { userId, ip, browser } }) !== 0;
}
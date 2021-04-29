import { Devices } from "../models/relations";

export async function createDevice(ip: string, browser: string, userId: number) {
    await Devices.create({ ip, browser, userId });
}

export async function getUserDevices(userId: number) {
    return Devices.findAll({ where: { userId }, raw: true });
}
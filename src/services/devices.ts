import { Devices } from "../models/relations";
import { Device } from "../utils/classes";
import {IDevices} from "../utils/interfaces";

export async function createDevice(device: Device, userId: number): Promise<void> {
    await Devices.create({ ... device.createDeviceObject(), userId });
}

export async function getUserDevices(userId: number): Promise<IDevices[]> {
    return Devices.findAll({ where: { userId }, raw: true });
}

export async function isExistDevice(device: Device, userId: number): Promise<boolean> {
    return await Devices.count({ where: { ...device.createDeviceObject(), userId } }) !== 0;
}
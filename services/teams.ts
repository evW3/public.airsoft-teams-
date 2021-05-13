import { Teams } from "../models/relations";

export async function create(name: string) {
    await Teams.create({ name });
}
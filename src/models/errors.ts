import { Schema, model } from "mongoose";

const errorSchema = new Schema({
    path: String,
    params: {},
    errorDescription: String,
    status: Number
});

export const errors = model("errors", errorSchema);
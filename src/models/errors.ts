import { Schema, model } from "mongoose";

const errorSchema = new Schema({
    path: String,
    params: {},
    errorDescription: String,
    status: Number,
    mode: String
});

export const errors = model("errors", errorSchema);
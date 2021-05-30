import { Schema, model } from "mongoose";

const requestsSchema = new Schema({
    path: String,
    params: {},
    mode: String
});

export const requests = model("requests", requestsSchema);
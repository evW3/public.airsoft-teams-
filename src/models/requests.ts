import { Schema, model } from "mongoose";

const requestsSchema = new Schema({
   path: String,
   params: {}
});

export const requests = model("requests", requestsSchema);
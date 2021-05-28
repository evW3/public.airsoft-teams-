import { app } from './configureServer';
import config from 'config';
import {IMongo} from "./utils/interfaces";
const mongoose = require('mongoose');

const db: IMongo = config.get("mongo");

const port: number = config.get('port');
mongoose.connect(`mongodb+srv://${ db.user }:${ db.password }@cluster0.bjaxb.mongodb.net/airsoft-team?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("MongoDb connected"));

export const server = app.listen(port, () => console.log(`[SERVER]: Started on port: ${ port }!`));
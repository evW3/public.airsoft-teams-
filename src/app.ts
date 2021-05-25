import { app } from './configureServer';
import * as config from 'config';

const mongoose = require('mongoose');

interface IMongo {
    user: string,
    password: string
}

const db: IMongo = config.get("mongo");

(async () => {
    try {
        const port: number = config.get('port');
        mongoose.connect(`mongodb+srv://${ db.user }:${ db.password }@cluster0.bjaxb.mongodb.net/airsoft-team?retryWrites=true&w=majority`)
            .then(() => console.log("MongoDb connected"));

        app.listen(port, () => console.log(`[SERVER]: Started on port: ${ port }!`));
    } catch (e) {
        console.log(`[ERROR] init error`);
    }
})()
import { app } from './configureServer';
import * as config from 'config';
//import { mRequest } from "./utils/MongoDB";
// import { ModelsSynchronizer as model } from './utils/ModelsSynchronizer';
// let ModelsSynchronizer = new model();

(async () => {
    try {
        const port: number = config.get('port');
        //await ModelsSynchronizer.syncAll();
        // const test = new mRequest({
        //     request: "GET",
        //     params: { queryId: 1, userId: 2 }
        // });

        //await test.save();
        app.listen(port, () => console.log(`[SERVER]: Started on port: ${ port }!`));
    } catch (e) {
        console.log(`[ERROR] init error`);
    }
})()
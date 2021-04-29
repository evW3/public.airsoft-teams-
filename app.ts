import { app } from './configureServer';
import config from 'config';
import { ModelsSynchronizer as model } from './utils/ModelsSynchronizer';
let ModelsSynchronizer = new model();

(async () => {
    try {
        const port: number = config.get('port');
        await ModelsSynchronizer.syncAll();
        app.listen(port, () => console.log(`[SERVER]: Started on port: ${ port }!`));
    } catch (e) {
        console.log(`[ERROR] init error`);
    }
})()
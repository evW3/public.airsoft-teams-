import { sequelize } from './BaseDB';
import '../models/relations';

export class ModelsSynchronizer {
    private async log(sequelize: any) {
        Object.keys(sequelize.models).map(modelName => console.log(`[DB]: Model "${ modelName }" were synchronized!`));
    }

    async syncAll() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            await this.log(sequelize);
        } catch (e) {
            console.log('[DB]: Failed connection to DB!');
        }
    }

    async removeAll() {
        await sequelize.drop();
    }
}
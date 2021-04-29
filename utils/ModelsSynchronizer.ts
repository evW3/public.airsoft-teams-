import { sequelize } from './BaseDB';
import { Roles } from '../models/relations';

export class ModelsSynchronizer {
    private async log(sequelize: any) {
        Object.keys(sequelize.models).map(modelName => console.log(`[DB]: Model "${ modelName }" were synchronized!`));
    }

    private async initRoles() {
        await Roles.destroy({ truncate: true, cascade: true });
        await Roles.bulkCreate([{ name: "ADMIN" }, { name: "MANAGER" }, { name: "PLAYER" }]);
    }

    async syncAll() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            await this.initRoles();
            await this.log(sequelize);
        } catch (e) {
            console.log('[DB]: Failed connection to DB!');
        }
    }

    async removeAll() {
        await sequelize.drop();
    }
}
import * as config from 'config';
import { Sequelize, DataTypes, Op, Model } from 'sequelize';
import { IDatabase } from './interfaces';

const database: IDatabase = config.get('db');

let sequelize = new Sequelize(`postgres://${database.login}:${database.password}@${database.host}:${database.port}/${database.name}`, {
    logging: false
});

export { sequelize, DataTypes, Op, Model };
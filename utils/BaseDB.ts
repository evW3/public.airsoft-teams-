import config from 'config';
import { Sequelize, DataTypes, Op } from 'sequelize';

interface IDatabase {
    name: string,
    port: number,
    host: string,
    login: string,
    password: string
}

const database: IDatabase = config.get('db');

let sequelize = new Sequelize(`postgres://${database.login}:${database.password}@${database.host}:${database.port}/${database.name}`, {
    logging: false
});

export { sequelize, DataTypes, Op };
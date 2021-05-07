import { sequelize, DataTypes } from '../utils/BaseDB';
import { v4 as uuidv4 } from 'uuid';

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    password_salt: {
        type: DataTypes.STRING
    },
    login: {
        type: DataTypes.STRING,
        defaultValue: uuidv4().split("-")[0]
    },
    profile_image: {
        type: DataTypes.STRING
    },
    activation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { Users };
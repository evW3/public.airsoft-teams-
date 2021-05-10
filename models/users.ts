import { sequelize, DataTypes } from '../utils/BaseDB';
import { v4 as uuidv4 } from 'uuid';
import { IUsers } from "../utils/interfaces";

const Users = sequelize.define<IUsers>("users", {
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
},{
        freezeTableName: true,
        timestamps: false,
    }
);

export { Users };
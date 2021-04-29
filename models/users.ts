import { sequelize, DataTypes } from '../utils/BaseDB';

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
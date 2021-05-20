import { sequelize, DataTypes } from '../utils/BaseDB';
import { v4 as uuidv4 } from 'uuid';
import { IVerificationCodes } from "../utils/interfaces";

const VerificationCodes = sequelize.define<IVerificationCodes>("verification_codes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.UUID,
        defaultValue: uuidv4()
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export { VerificationCodes };
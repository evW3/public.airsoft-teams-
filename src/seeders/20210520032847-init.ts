'use strict';
import { QueryInterface } from "sequelize";
import { getListPermissions, PermissionsList, getListRolesPermissions } from "../constants";
import { encrypt } from "../utils/security";
import { adminObject } from "../utils/types"
import config from 'config';

const admin: adminObject = config.get("admin");

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert('roles', [
            {
                name: 'ADMIN'
            },
            {
                name: 'MANAGER'
            },
            {
                name: 'PLAYER'
            }
        ]);
        await queryInterface.bulkInsert('permissions', getListPermissions(PermissionsList))
        const permissions: any = (await queryInterface.sequelize.query('SELECT * FROM "permissions"'))[0];
        const roles: any = (await queryInterface.sequelize.query('SELECT * FROM "roles"'))[0];
        const encryptData = await encrypt(admin.password);
        await queryInterface.bulkInsert('role_permissions', getListRolesPermissions(PermissionsList, permissions, roles))
        await queryInterface.insert(null, "users", {
            email: admin.email,
            password: encryptData.encryptedPassword,
            password_salt: encryptData.salt,
            roleId: roles[roles.findIndex((item: any) => item.name === 'ADMIN')].id
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`DELETE FROM "users" WHERE email='${ admin.email }'`);
        await queryInterface.sequelize.query('DELETE FROM "role_permissions"');
        await queryInterface.sequelize.query('DELETE FROM "roles"');
        await queryInterface.sequelize.query('DELETE FROM "permissions"');
    }
};

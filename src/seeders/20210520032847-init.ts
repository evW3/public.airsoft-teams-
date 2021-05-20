'use strict';
import { QueryInterface } from "sequelize";
import { getListPermissions, PermissionsList } from "../constants";

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
    },

    down: async (queryInterface: QueryInterface) => {

    }
};

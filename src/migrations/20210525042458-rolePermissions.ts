'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('role_permissions', {
          roleId: {
              type: INTEGER,
              references: {
                  model: 'roles',
                  key: 'id'
              }
          },
          permissionId: {
              type: INTEGER,
              references: {
                  model: 'permissions',
                  key: 'id'
              }
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('role_permissions', { cascade: true });
  }
};

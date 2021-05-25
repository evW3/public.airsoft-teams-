'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('devices', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          ip: {
              type: STRING
          },
          browser: {
              type: STRING
          },
          userId: {
              type: INTEGER,
              references: {
                  model: 'users',
                  key: 'id'
              }
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('devices', { cascade: true });
  }
};

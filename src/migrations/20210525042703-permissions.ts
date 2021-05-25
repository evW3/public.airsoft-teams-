'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('permissions', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true,
              onDelete: 'cascade'
          },
          name: {
              type: STRING
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('permissions', { cascade: true });
  }
};

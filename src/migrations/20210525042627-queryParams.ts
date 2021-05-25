'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('query_params', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          parameter: {
              type: STRING
          },
          queryId: {
              type: INTEGER,
              references: {
                  model: 'queries',
                  key: 'id'
              }
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('query_params', { cascade: true });
  }
};

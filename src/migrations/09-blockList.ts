'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('block_list', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          description: {
              type: STRING,
              allowNull: false
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
      await queryInterface.dropTable('block_list',{ cascade: true });
  }
};

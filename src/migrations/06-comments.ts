'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('comments', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true,
              onDelete: 'cascade'
          },
          description: {
              type: STRING,
              allowNull: false
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('comments', { cascade: true });
  }
};

'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('team_members', {
          userId: {
              type: INTEGER,
              references: {
                  model: 'users',
                  key: 'id'
              }
          },
          teamId: {
              type: INTEGER,
              references: {
                  model: 'teams',
                  key: 'id'
              }
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('team_members', { cascade: true });
  }
};

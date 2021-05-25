'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER } = require('sequelize');

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('queries_comments', {
          queryId: {
              type: INTEGER,
              references: {
                  model: 'queries',
                  key: 'id'
              }
          },
          commentId: {
              type: INTEGER,
              references: {
                  model: 'comments',
                  key: 'id'
              }
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('queries_comments',{ cascade: true });
  }
};

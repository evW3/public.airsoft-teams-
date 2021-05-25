'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, ENUM } = require('sequelize');
import { queryTypes, statuses } from "../utils/enums";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('queries', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true,
              onDelete: 'cascade'
          },
          type: {
              type: ENUM,
              values: [queryTypes.CHANGE_ROLE, queryTypes.JOIN_TEAM, queryTypes.EXIT_FROM_TEAM, queryTypes.MOVE_TO_ANOTHER_TEAM],
              allowNull: false
          },
          status: {
              type: ENUM,
              values: [statuses.ACCEPTED, statuses.DECLINE, statuses.PROCESSED],
              defaultValue: statuses.PROCESSED,
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
      await queryInterface.dropTable('queries', { cascade: true });
  }
};

'use strict';

import { QueryInterface } from "sequelize";
const { INTEGER, UUID } = require('sequelize');
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('verification_codes', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          code: {
              type: UUID,
              defaultValue: uuidv4()
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
      await queryInterface.dropTable('verification_codes', { cascade: true });
  }
};

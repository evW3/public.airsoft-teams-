'use strict';
import { QueryInterface } from "sequelize";
const { INTEGER, STRING } = require('sequelize');
const { uploads } = require('../constants');
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
      await queryInterface.createTable('users', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true,
              onDelete: 'cascade'
          },
          email: {
              type: STRING
          },
          password: {
              type: STRING
          },
          password_salt: {
              type: STRING
          },
          login: {
              type: STRING,
              defaultValue: uuidv4().split("-")[0]
          },
          profile_image: {
              type: STRING,
              defaultValue: `${ uploads }/default.jpg`
          },
          roleId: {
              type: INTEGER,
              references: {
                  model: 'roles',
                  key: 'id'
              }
          }
      });
  },

  down: async (queryInterface: QueryInterface) => {
      await queryInterface.dropTable('users',{ cascade: true });
  }
};

'use strict';
import { QueryInterface, Sequelize } from "sequelize";

const { INTEGER, STRING, UUID, JSON, ENUM } = require('sequelize');
const { uploads } = require('../constants');
import { v4 as uuidv4 } from 'uuid';
import { queryTypes, statuses } from "../utils/enums";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
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
      await queryInterface.createTable('roles', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: STRING
          }
      });
      await queryInterface.createTable('comments', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          description: {
              type: STRING,
              allowNull: false
          }
      });
      await queryInterface.createTable('permissions', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: STRING
          }
      });
      await queryInterface.createTable('queries', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          type: {
              type: ENUM,
              values: [queryTypes.CHANGE_ROLE, queryTypes.ENTER_TEAM],
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
      await queryInterface.createTable('teams', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: STRING,
              allowNull: false
          }
      });
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
      await queryInterface.createTable('role_permissions', {
          roleId: {
              type: INTEGER,
              references: {
                  model: 'roles',
                  key: 'id'
              }
          },
          permissionId: {
              type: INTEGER,
              references: {
                  model: 'permissions',
                  key: 'id'
              }
          }
      });
      await queryInterface.createTable('query_params', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          parameters: {
              type: JSON
          },
          queryId: {
              type: INTEGER,
              references: {
                  model: 'queries',
                  key: 'id'
              }
          }
      });
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
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('team_members');
    await queryInterface.dropTable('verification_codes');
    await queryInterface.dropTable('role_permissions');
    await queryInterface.dropTable('query_params');
    await queryInterface.dropTable('queries_comments');
    await queryInterface.dropTable('queries');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('devices');
    await queryInterface.dropTable('comments');
    await queryInterface.dropTable('block_list');
  }
};
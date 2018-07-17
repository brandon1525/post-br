/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Sequelize from 'sequelize';

module.exports = {

  attributes: {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    created_at: Sequelize.DATE
  },
  options: {
    tableName: 'users',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};

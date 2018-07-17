/**
 * Posts.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Sequelize from 'Sequelize';

module.exports = {

  attributes: {
    post_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    responses_count: Sequelize.INTEGER,
    post_content: Sequelize.TEXT,
    created_at: Sequelize.DATE,
  }

};

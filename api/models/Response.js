/**
 * Responses.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    response_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    response_content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: Sequelize.DATE
  },
  associations: function () {
    Response.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'user_id'
    });
    Response.belongsTo(Post, {
      foreignKey: 'post_id',
      targetKey: 'post_id'
    });
  },
  options: {
    freezeTableName: false,
    tableName: 'responses',
    classMethods: {},
    instanceMethods: {},
    hooks: {
      beforeDestroy: function (resp, options) {
        return new Promise((resolve, reject) => {
          if (resp.user_id === options.user.user_id && resp.post_id === parseInt(options.post_id)) {
            return resolve(resp, options);
          } else {
            return reject(false);
          }
        });
      }
    }
  }

};

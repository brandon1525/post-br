/**
 * Posts.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {
  attributes: {
    post_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    responses_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    post_content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: Sequelize.DATE
  },
  associations: function () {
    Post.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'user_id'
    });
    Post.hasMany(Response, {
      as: 'responses',
      foreignKey: 'post_id'
    });
  },
  defaultScope: function () {
    return {
      include: [{
        model: Response,
        as: 'responses'
      }, ]
    };
  },
  options: {
    freezeTableName: false,
    tableName: 'posts',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcryptjs = require('bcryptjs');

module.exports = {

  attributes: {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: Sequelize.DATE,
  },
  associations: function () {
    User.hasMany(Post, {
      as: 'posts',
      foreignKey: 'user_id'
    });
    User.hasMany(Response, {
      as: 'responses',
      foreignKey: 'user_id'
    });
  },
  defaultScope: function () {
    return {
      include: [{
          model: Post,
          as: 'posts'
        },
        {
          model: Response,
          as: 'responses'
        },
      ]
    };
  },
  options: {
    freezeTableName: false,
    tableName: 'users',
    classMethods: {},
    instanceMethods: {},
    hooks: {
      beforeCreate: function (user, options) {
        return new Promise((resolve, reject) => {
          bcryptjs.hash(user.password, 10, function passwordEncrypted(err, encryptedPassword) {
            if (err) {
              return reject(err);
            }
            user.password = encryptedPassword;
            return resolve(user, options);
          });
        });
      }
    }
  }

};

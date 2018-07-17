/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function (req, res) {
    console.log(req.body);

    Users.all().then(users => {
      // projects will be an array of all Project instances
      return res.json(users);
    });
  },

};

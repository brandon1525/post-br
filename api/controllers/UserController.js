/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');

module.exports = {
  signup: function (req, res) {
    if (!req.param('password') || req.param('password') !== req.param('repassword')) {
      return res.json({
        result: false,
        message: 'Ingrese el mismo password'
      });
    }
    User.create(req.allParams()).then((user) => {
      if (!user) {
        return res.json({
          result: false,
          message: 'Error durante la creación'
        });
      }
      return res.json({
        result: true,
        message: 'Usuario creado con éxito'
      });
    }).catch((error) => {
      console.log(error);
      return res.status(500).json({
        result: false,
        message: error
      });
    });
  },
  login: function (req, res) {
    if (!req.param('username') || !req.param('password')) {
      return res.json({
        result: false,
        message: 'Usuario y password requeridos'
      });
    }
    User.findOne({
      where: {
        username: req.param('username')
      }
    }).then((user) => {
      if (!user) {
        return res.json({
          result: false,
          message: 'No hay usuario'
        });
      }
      bcrypt.compare(req.param('password'), user.password, (message, valid) => {
        if (message) {
          return res.json({
            result: false,
            message
          });
        }
        if (!valid) {
          return res.json({
            result: false,
            message: 'Usuario o contraseña no válido'
          });
        }
        req.session.authenticated = true;
        req.session.User = user;
        return res.json({
          result: true,
          message: 'Inicio de session correcto'
        })
      });
    }).catch((error) => {
      console.log(error);
      return res.status(500).json({
        result: false,
        message: error
      });
    });
  },
  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  }

};

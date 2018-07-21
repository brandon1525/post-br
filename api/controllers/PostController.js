/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var q = require('q');

module.exports = {
  index: function (req, res) {
    Post.all().then(posts => {
      res.view('pages/posts/posts', {
        posts: posts
      });
    });
  },

  create: function (req, res) {
    const user = req.session.User;
    const post_content = req.param('post_content');
    Post.create({
      post_content: post_content,
      user_id: user.user_id
    }).then((post) => {
      return res.json({
        result: true,
        message: 'Post creado con éxito',
        data: post
      });
    }).catch((error) => {
      return res.status(500).json({
        result: false,
        message: error
      });
    });
  },

  get: function (req, res) {
    const post_id = req.param('post_id');
    Post.findById(post_id).then(post => {
      res.view('pages/posts/post', {
        post: post
      });
    }).catch(error => {
      console.log(error);
      res.redirect('/posts');
    });
  },

  delete: function (req, res) {
    const user = req.session.User;
    const post_id = req.param('post_id');
    Response.destroy({
      where: {
        post_id,
        user_id: user.user_id
      }
    }).then(() => {
      Post.destroy({
        where: {
          post_id
        }
      }).then((post_deleted) => {
        console.log(post_deleted);
        if (!post_deleted) {

        }
        return res.json({
          result: true,
          message: 'Post eliminado con éxito'
        });
      }).catch((error) => {
        return res.status(500).json({
          result: false,
          message: error
        });
      })
    }).catch((error) => {
      return res.status(500).json({
        result: false,
        message: error
      });
    });;
  }

};

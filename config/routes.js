module.exports.routes = {
  '/': {
    view: 'pages/homepage'
  },
  'get /login': {
    view: 'pages/login'
  },
  'get /sign-up': {
    view: 'pages/sign-up'
  },
  'get /post': {
    view: 'pages/posts/create'
  },

  // User routes
  'post /user/sign-up': 'UserController.signup',
  'post /user/login': 'UserController.login',
  'get /logout': 'UserController.logout',
  // posts routes
  'get /posts': 'PostController.index',
  'post /post': 'PostController.create',
  'get /post/:post_id': 'PostController.get',
  'delete /post/:post_id': 'PostController.delete'


};

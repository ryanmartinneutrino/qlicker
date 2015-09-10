Router.configure({
  layoutTemplate:'main-layout'
});

Router.route('/',{
  template: 'default_app'
});
Router.route('/register');
Router.route('/login');


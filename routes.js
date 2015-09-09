Router.configure({
  layoutTemplate:'main-layout'
});

Router.route('/',{
  template: 'default-app'
});
Router.route('/register');
Router.route('/login');


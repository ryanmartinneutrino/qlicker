Router.configure({
  layoutTemplate:'main-layout'
});

Router.route('/',{
  template: 'default_app'
});

Router.route('/default_app',{
  template: 'default_app'
});

Router.route('/register',{
  template:'register'
});

Router.route('/login',{
  template:'login'
});

Router.route('/logout',{
  onBeforeAction: function(){
    Meteor.logout();
    Router.go('/login');
  }

 });


Router.route('/newCourse',{
  template:'newCourse',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      Router.go('/login'); 
    }
  }

});


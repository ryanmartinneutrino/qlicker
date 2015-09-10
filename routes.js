Router.configure({
  layoutTemplate:'main-layout'
});

Router.route('/',{
  template: 'default_app'
});
Router.route('/register');
Router.route('/login');


Router.route('/newCourse',{

  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      Router.go('/login'); 
    }
  }

});


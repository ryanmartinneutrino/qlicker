Template.navigation.events({
  "click .logout":function(event){
    event.preventDefault();
    Meteor.logout();
  },
  "click .signin-button":function(){
    Router.go("/login");
  }

});

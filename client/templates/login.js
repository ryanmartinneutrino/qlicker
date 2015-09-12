Template.login.onCreated(function(){
  Session.setPersistent("currentCourse","");
});

Template.login.onRendered(function(){
  var validator =  $('.login').validate({
    submitHandler:  function(event){
     // event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();

      Meteor.loginWithPassword(email,password,function(error){
          if(error){
            validator.showErrors({
              email:error.reason
            });
          }
          else{
            Router.go("/");
          }
        }
      );
   } 
  });
});

Template.login.events({
"submit form":function(event){
  event.preventDefault();

}
});

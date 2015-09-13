Template.register.onRendered(function(){
  var validator =  $('.register').validate({
    submitHandler:  function(event){
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var passwordconf = $('[name=password]').val();
//      if(password !== passwordconf)return;

      var firstName = $('[name=firstName]').val();
      var lastName = $('[name=lastName]').val();
      var institution = $('[name=institution]').val();

      Accounts.createUser({
         email: email,
         password: password,
        },function(error){
          if(error){
            validator.showErrors({
              email:error.reason
            });
          }

         else{
           Meteor.loginWithPassword(email,password);
           var metId=Meteor.userId();
           Users.insert({
             _id:metId,
             email: email,
             firstName: firstName,
             lastName: lastName,
             institution: institution,
             enrolledCourse_Ids:[],
             createdCourse_Ids:[]
           });
           Router.go("/");
         }//end else 
      });
   } 
  });
});

Template.register.helpers({
  institutions: function(){
    return Institutions.find({});
  }
});

Template.register.events({
  "submit form": function(event){
    event.preventDefault();
    //rest of submit is handled by the submitHandler of the validator
  }
});
//

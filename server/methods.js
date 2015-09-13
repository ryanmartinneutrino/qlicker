Meteor.methods({

  newUser : function(user){
    var metId=Accounts.createUser({
      email: user.email,
      password: user.password,
    });

    Users.insert({
      _id:user.metId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
   });

  }


});

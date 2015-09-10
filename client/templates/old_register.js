  
Template.register.onCreated(function(){
  Session.set("isStudent",false);
  Session.set("isTeacher",false);
});

Template.register.helpers({
  institutions: function(){
    return Institutions.find({});
  },
  isTeacher:  function(){
    return Session.get("isTeacher");
  },
  isStudent:  function(){
    return Session.get("isStudent");
  }

});

Template.register.events({

  "click .choose-student":function(){
   Session.set("isStudent",true);
   Session.set("isTeacher",false);
  },
  "click .choose-teacher":function(){
   Session.set("isStudent",false);
   Session.set("isTeacher",true);
  }

});



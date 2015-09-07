Questions = new Mongo.Collection("questions");


if (Meteor.isClient) {

  Template.questionlist.helpers({
    questions: function(){
      return Questions.find({});
    }
  });

  Template.body.onCreated(function(){
   Session.set('newanswers',[{newansnum:"ans1"}]);
  });

  Template.newquestion.helpers({
    newanswers:function(){ 
     return Session.get('newanswers');
    }
  });

  Template.newquestion.events({
    "click .add-answer":function (event) {
    var newanswers=Session.get('newanswers');
    var length=newanswers.length;
    newanswers.push({newansnum:"ans"+(length+1)});
    Session.set('newanswers',newanswers);
   }
  });

  Template.newquestion.events({
    "submit .new-question": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var qtitle = event.target.qtitle.value;
      if(qtitle==="")return;
      event.target.qtitle.value="";//clear it now
      var nanswers=Session.get('newanswers').length;
      console.log("number of answers: "+nanswers);
      var ansar=Array();
      var ansi="";
      for(var i=0;i<nanswers;i++){
       ansi=event.target["ans"+(i+1)].value;
       ansar.push({ans:ansi});
       event.target["ans"+(i+1)].value="";//clear it now
      }
      // Insert a question into the collection
      Questions.insert({
        qtitle: qtitle,
        answers:ansar,//[{ans:ans1},{ans:ans2}],
        createdAt: new Date() // current time
      });
      Session.set('newanswers',[{newansnum:"ans1"}]);
    }
  });

  Template.question.events({
    "click .delete":function (){
      Questions.remove(this._id);
    }
  });
/*
    questions:[
    {qtitle:"Who is Einstein?",
     answers:[{ans:"A physicist"},
              {ans:"A Scholar"},
              {ans:"A hairy dude"}]},
    {qtitle:"Who is Ryan?",
     answers:[{ans:"A physicist"},
              {ans:"A Scholar"},
              {ans:"A hairy dude"}]}   
   ]*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

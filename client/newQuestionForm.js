  Template.newQuestionForm.onCreated(function(){
   Session.set('newanswers',[{newansnum:"ans1"}]);
  });

  Template.newQuestionForm.helpers({
    newanswers:function(){
     return Session.get('newanswers');
    }
  });

  Template.newQuestionForm.events({
    "click .add-answer":function() {
    var newanswers=Session.get('newanswers');
    var length=newanswers.length;
    newanswers.push({newansnum:"ans"+(length+1)});
    Session.set('newanswers',newanswers);
   },

    "click .remove-answer":function() {
    var newanswers=Session.get('newanswers');
    var length=newanswers.length;
    if(length<2)return;
    newanswers.pop();
    Session.set('newanswers',newanswers);
   },

    "submit form":function(event) {
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
      var currentUserId = Meteor.userId();
      // Insert a question into the collection
      Questions.insert({
        qtitle: qtitle,
        answers:ansar,//[{ans:ans1},{ans:ans2}],
        createdAt: new Date(), // current time
        createdBy: currentUserId
      });
      Session.set('newanswers',[{newansnum:"ans1"}]);
    }
  });


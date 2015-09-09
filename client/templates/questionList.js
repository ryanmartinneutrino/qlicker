  Template.questionList.helpers({
    questions: function(){
      return Questions.find({});
    }
  });

  Template.questionList.events({
    "click .answer": function(){

    },
    "mouseover .answer": function(){
    //  console.log("you have your mouse over an answer"+event);
    },

  });


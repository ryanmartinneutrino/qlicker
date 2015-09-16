Template.question.onRendered(function(){
  var answerStates = [];
  var nAnswers= Template.currentData().answers.length;
  var qid= Template.currentData()._id;
  for(var i=0;i<nAnswers;i++){
   answerStates.push(0);
  }
  Session.set(qid+"AnswerStates",answerStates);

});

Template.question.events({
  "click .delete":function (){
    Questions.remove(this._id);
  },

  "click .answerButton":function(){
    var qid= Template.currentData()._id;
    var index=parseInt(this.ansId);
    var answerStates = Session.get(qid+"AnswerStates");
    if(answerStates[this.ansId]==0)answerStates[index]=1;
    else answerStates[index]=0;

    Session.set(qid+"AnswerStates",answerStates);
  },
  
  "click .submitQuestionButton":function(){
    var qid= Template.currentData()._id;
    var answerStates = Session.get(qid+"AnswerStates");
    var nAnswers = answerStates.length;

  }

});


Template.questionInSession.onRendered(function(){
  var answerStates = [];
  var nAnswers= Template.currentData().answers.length;
  var qid= Template.currentData()._id;
  for(var i=0;i<nAnswers;i++){
   answerStates.push(0);
  }
  Session.set(qid+"AnswerStates",answerStates);

});

Template.questionInSession.helpers({
  showSubmit:function(){
    //don't show submit button if users has already exceeded maxSubmits for this question in this session
    var qid= Template.currentData()._id;
    var sid=Template.parentData()._id;
    var uid=Meteor.userId();
    var questionInSession=QuestionsInSessions.findOne({$and:[{questionId:qid},{sessionId:sid}]});
    var maxSubmits=questionInSession.maxSubmits;
    
    var responseByUser=Responses.findOne({$and:[ {userId:uid}, {questionId:qid}, {sessionId:sid} ]});
    if(responseByUser!==undefined){
      if(responseByUser.responses.length>maxSubmits)return false;      
    }
    return true;
  }


});

Template.questionInSession.events({
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

    //Create/update a response record for this question
    //First check if user has already responded to this question, if yes, update the response record
    var uid=Meteor.userId();
    var response=Responses.findOne({$and:[{questionId:qid},{userId:uid}]});
    var sid=Template.parentData()._id;
    if(response==undefined){
      response={
        userId:uid,
        questionId:qid,
        responses:[answerStates],
        sessionId:sid
      }
      Responses.insert(response);
    }
    else{
      Responses.update(response._id,{$push:{responses:answerStates} });      
    }
    response=Responses.findOne({$and:[{questionId:qid},{userId:uid}]});
    var qis=QuestionsInSessions.find({$and:[{questionId:qid},{sessionId:sid}]});
    QuestionsInSessions.update(qis._id,{$push:{responseIds:response._id}});
    //update the votes for the answers:
    var answers=Questions.findOne({_id:qid}).answers;
    for(var i=0;i<nAnswers;i++){
      if(answerStates[i]==1)answers[i].votes=answers[i].votes+1;
    }
    Questions.update(qid,{$set:{answers:answers}});        

  }

});


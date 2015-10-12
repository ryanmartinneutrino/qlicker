
Template.addRemoveQuestionFromSession.helpers({

  isInSession:function(){
    var qid= Template.currentData()._id;
    var sid=Template.parentData(2)._id;
    var questionInSession=QuestionsInSessions.findOne({$and:[{questionId:qid},{sessionId:sid}]});
    if(questionInSession)return true;
    else return false;
  },

});

Template.addRemoveQuestionFromSession.events({

  "click .addQuestionToSessionButton":function(){
    var qid= Template.currentData()._id;
    var sid=Template.parentData(2)._id;
    console.log("add question "+qid+" to session "+sid);
    if(QuestionsInSessions.findOne({$and:[{questionId:qid},{sessionId:sid}]})==undefined){
      var question=Questions.findOne({_id:qid});
      var nAnswers=question.answers.length;
      var questionInSession={
        questionId:qid,
        sessionId:sid,
        maxSubmits:1,
        isActive:false,
        showVotes:false,
        showFeedback:false,
        votes:Array(nAnswers).fill(0),
        responseIds:[]
      };
      QuestionsInSessions.insert(questionInSession);
      Sessions.update({_id:sid},{$push :{questionIds:qid}});
    }
  },

  "click .removeQuestionFromSessionButton":function(){
    var qid= Template.currentData()._id;
    var sid=Template.parentData(2)._id;
    //TODO: should check if it's the session before trying to delete! (in principle, the button shouldn't show if this is the case)
    Sessions.update({_id:sid},{$pull :{questionIds:qid}});
    var qis=QuestionsInSessions.findOne({$and:[{questionId:qid},{sessionId:sid}]});
    QuestionsInSessions.remove(qis._id);
  }


});




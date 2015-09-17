Template.sessionRun.helpers({

  questionsInSession:function(){
    var ids=[];
    if(this.session)ids=this.session.questionIds;
    questions=Questions.find({_id:{$in :ids}});
    return questions;
  },
 
});

Template.sessionRun.events({
  "click .activateQuestionButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    console.log("Activating "+qis._id);
    QuestionsInSessions.update(qis._id,{$set:{isActive:true}});

  }
//TODO: Add a button to de-activate a question
//TODO: Add a button to increase the number of allowed submites


});








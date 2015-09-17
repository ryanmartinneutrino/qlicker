Template.sessionRun.helpers({

  questionsInSession:function(){
    var ids=[];
    if(this.session)ids=this.session.questionIds;
    questions=Questions.find({_id:{$in :ids}});
    return questions;
  },
  isActive:function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    return qis.isActive;
  }
 
});

Template.sessionRun.events({
  "click .activateQuestionButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    console.log("Activating "+qis._id);
    QuestionsInSessions.update(qis._id,{$set:{isActive:true}});

  },
  "click .deactivateQuestionButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    console.log("Activating "+qis._id);
    QuestionsInSessions.update(qis._id,{$set:{isActive:false}});

  },




//TODO: Add a button to increase the number of allowed submites
//TODO: Button to choose whether to show votes


});








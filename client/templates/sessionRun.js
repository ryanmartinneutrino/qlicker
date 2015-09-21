Template.sessionRun.helpers({

  questionsInSession:function(){
    var ids=[];
    if(this.session)ids=this.session.questionIds;
    questions=Questions.find({_id:{$in :ids}});
    if(questions)return questions;
    else return [];
  },
  isActive:function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    if(qis)return qis.isActive;
    else return false;
  },
  maxSubmits:function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    if(qis)return qis.maxSubmits;
    else return 0;
  },
  isShowingVotes:function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    if(qis && qis.showVotes)return true;
    else return false;
  },
  
 
});

Template.sessionRun.events({
  "click .activateQuestionButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
//    console.log("Activating "+qis._id);
    QuestionsInSessions.update(qis._id,{$set:{isActive:true}});

  },
  "click .deactivateQuestionButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    QuestionsInSessions.update(qis._id,{$set:{isActive:false}});

  },

 "click .increaseSubmitButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    QuestionsInSessions.update(qis._id,{$inc:{maxSubmits:1}});

  },
 "click .decreaseSubmitButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    if(qis.maxSubmits>0)  QuestionsInSessions.update(qis._id,{$inc:{maxSubmits:-1}});

  },
  "click .showVotesButton":function(){
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this._id},{sessionId:Template.parentData().session._id}]});
    if(qis){
     if(qis.showVotes)QuestionsInSessions.update(qis._id,{$set:{showVotes:false}});
     else QuestionsInSessions.update(qis._id,{$set:{showVotes:true}});
    }
  },





});








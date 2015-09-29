Template.questionInSessionControl.helpers({
  question:function(){
    return Questions.findOne({_id:this.questionId});
  }


});


Template.questionInSessionControl.events({
  "click .activateQuestionButton":function(){
    QuestionsInSessions.update(this._id,{$set:{isActive:true}});

  },
  "click .deactivateQuestionButton":function(){
    QuestionsInSessions.update(this._id,{$set:{isActive:false}});

  },

 "click .increaseSubmitButton":function(){
    QuestionsInSessions.update(this._id,{$inc:{maxSubmits:1}});

  },
 "click .decreaseSubmitButton":function(){
    if(this.maxSubmits>0)  QuestionsInSessions.update(this._id,{$inc:{maxSubmits:-1}});

  },
  "click .showVotesButton":function(){
    if(this.showVotes)QuestionsInSessions.update(this._id,{$set:{showVotes:false}});
    else QuestionsInSessions.update(this._id,{$set:{showVotes:true}});
  },


});








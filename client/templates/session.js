
Template.session.helpers({
  questionsInSession:function(){
    var ids=[];
    ids=this.questionIds;
    var sid=this._id;
    var qis=QuestionsInSessions.find({$and:[{sessionId:sid},{isActive:true}]});
   //TODO: Only list active questions! 
    if(ids){
      questions=Questions.find({_id:{$in :ids}});
      return questions;
    }
  },

  ifOwner:function(){
    createdById=this.createdById;
    if(Meteor.userId()==createdById)return true;
    else return false;
  }

});

Template.sessionList.events({


});




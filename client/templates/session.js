
Template.session.helpers({
  questionsInSession:function(){
    var ids=[];
    ids=this.questionIds;
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




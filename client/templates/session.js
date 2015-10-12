
Template.session.helpers({
  activeQuestionsInSession:function(){
    var ids=[];
    //ids=this.questionIds;
    var sid=this._id;
    //Get the active questions in the session:
    var qis=QuestionsInSessions.find({$and:[{sessionId:sid},{isActive:true}]}).fetch();
//    console.log("qis: "+qis.length);
    var nq=qis.length;
    for(var i=0;i<nq;i++){
      ids.push(qis[i].questionId);
    }
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





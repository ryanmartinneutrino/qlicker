Template.sessionRun.helpers({

  questionsInSession:function(){
    var ids=[];
    if(this.session)ids=this.session.questionIds;
    questions=Questions.find({_id:{$in :ids}});
    return questions;
  },
 
  courseId:function(parentData){
   if(parentData.course)return parentData.course._id;  
  },

  sessionId:function(parentData){
   if(parentData.session)return parentData.session._id;
  }



});









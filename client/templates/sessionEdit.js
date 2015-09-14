Template.sessionEdit.helpers({

  questionsFromCourse:function(){
    var inCourseIds=[];
    if(this.course)inCourseIds=this.course.questionIds;
    var alreadyInSessionIds=[];
    if(this.session) alreadyInSessionIds=this.session.questionIds;
    alreadyInSessionIds.forEach(function(qid){
      var index=inCourseIds.indexOf(qid);
      if(index>-1)inCourseIds.splice(index,1);
    });
    questions=Questions.find({_id:{$in :inCourseIds}}); 
    return questions;
  },

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

Template.sessionEdit.events({
  "click .addQuestionToSessionButton":function(event){
    event.preventDefault();
//    console.log("value: "+event.currentTarget.val());
    Sessions.update({_id:this.session._id},{$push:{questionIds:this._id}});
  }


});








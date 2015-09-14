Template.sessionEdit.helpers({

  questionsFromCourse:function(){
    var ids=[];
    if(this.course)ids=this.course.questionIds;
    questions=Questions.find({_id:{$in :ids}}); 
    return questions;
  },

  questionsInSession:function(){
    var ids=[];
    if(this.session)ids=this.session.questionIds;
    questions=Questions.find({_id:{$in :ids}});
    return questions;
  },
 
  courseId:function(){
    return this.course._id;
  },

  sessionId:function(){
    return this.session._id;
  }



});

Template.sessionEdit.events({
  "click .addQuestionToSessionButton":function(event){
    event.preventDefault();
//    console.log("value: "+event.currentTarget.val());
    Sessions.update({_id:this.session._id},{$push:{questionIds:this._id}});
  }


});








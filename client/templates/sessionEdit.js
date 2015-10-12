Template.sessionEdit.helpers({

  availableQuestions:function(){
    var inCourseIds=[];
    if(this.course)inCourseIds=this.course.questionIds;
    //questions=Questions.find({_id:{$in :inCourseIds}});
    questions=Questions.find({});
    return questions;
  },

});

Template.sessionEdit.events({
  "click .addQuestionToSessionButton":function(event){
    event.preventDefault();
    Sessions.update({_id:this.session._id},{$push:{questionIds:this._id}});
  }


});








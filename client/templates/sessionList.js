
Template.sessionList.helpers({
  sessions:function(){
    return Sessions.find({courseId:this._id});
  }

});

Template.sessionList.events({

  "click .newSessionButton": function(event){
    event.preventDefault();
    var course=Courses.findOne({_id:this._id});
    var nSessionsInCourse=0;
    if(course)nSessionsInCourse=course.sessionIds.length;
    var sessionNumber=nSessionsInCourse+1
    var session = {
      courseId:this._id,
      createdById:Meteor.userId(),
      current:false,
      sessionNumber:sessionNumber,
      questionIds:[] 
    }
    var sid=Sessions.insert(session);
    Courses.update({_id:this._id}, {$push: {sessionIds:sid}});
   // Router.go('/course/'+this._id+'/session/edit/'+sid);
  },

});




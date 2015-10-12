
Template.sessionInCourseList.helpers({
  sessions:function(){
    createdById=this.createdById;
    if(Meteor.userId()==createdById){
      return Sessions.find({courseId:this._id});
    }
    else{
      return Sessions.find({$and:[{courseId:this._id},{isActive:true}]});
    }
  },

  isOwner:function(){
    createdById=this.createdById;
    if(Meteor.userId()==createdById)return true;
    else return false;
  },

  isActive:function(){
    if(this)return this.isActive;
    else return false;
  },

  backgroundColor:function(){
    if(this){
      if(this.isActive) return "";
      else return "";
    }
    //else return "#F0F0F0";   
    else return "";   
  }

});

Template.sessionInCourseList.events({

  "click .newSessionButton": function(){
    var course=Courses.findOne({_id:this._id});
    var nSessionsInCourse=0;
    if(course)nSessionsInCourse=course.sessionIds.length;
    var sessionNumber=nSessionsInCourse+1
    var session = {
      courseId:this._id,
      createdById:Meteor.userId(),
      sessionNumber:sessionNumber,
      questionIds:[] 
    }
    var sid=Sessions.insert(session);
    Courses.update({_id:this._id}, {$push: {sessionIds:sid}});
   // Router.go('/course/'+this._id+'/session/edit/'+sid);
  },
  
  "click .activateSessionButton": function(){
     Sessions.update({_id:this._id},{$set:{isActive:true}});
  },

  "click .deactivateSessionButton": function(){
     Sessions.update({_id:this._id},{$set:{isActive:false}});
  },

  "click .viewSessionButton":function(){
     Router.go("/session/"+this._id);
  },

  "click .editSessionButton":function(){
     Router.go("/session/edit/"+this._id);
  },

  "click .runSessionButton":function(){
     Router.go("/session/run/"+this._id);
  },

  "click .deleteSessionButton":function(){
    Sessions.update({_id:this._id},{$set:{courseId:"",originalCourseId:this._id}});   
  },

});




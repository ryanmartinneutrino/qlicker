Template.courseLogin.onCreated(function(){
 Session.set("currentCourseEnroll","");
});

Template.courseLogin.helpers({

  loggedIntoCourse: function(){
    var currentCourse=Session.get("currentCourse");
    if(currentCourse==="" || currentCourse=== undefined)return false;
    return true;
  },

  currentCourseInfo:function(){
    var currentCourse=Session.get("currentCourse");
    if( currentCourse==="" || currentCourse === undefined)return "Not logged into any course";
    else{
     var course=Courses.findOne({_id:currentCourse});
     if(course) return course.name+" ("+course.semester+" "+course.year+")";
    }
  }, 

  needToEnroll:function(){
    var currentCourseEnroll=Session.get("currentCourseEnroll");
    if(currentCourseEnroll==="" || currentCourseEnroll=== undefined)return false;
    return true;
  },

  availableCourses:function(){
    var currentUser=Meteor.userId();
    var user=Users.findOne({_id:currentUser});
    if(user){
      var createdCourseIds=user.createdCourseIds;
      var enrolledCourseIds=user.enrolledCourseIds;
      return Courses.find({$or:[
        {_id: {$in :createdCourseIds}},
        {_id: {$in :enrolledCourseIds}}
        ]});
    }
  },

  availableCoursesAll:function(){
    var currentUser=Meteor.userId();
    return Courses.find({$and:[{createdById:{$ne:currentUser}},{enrolledUserIds:{$ne:currentUser}} ]});
  },

});

Template.courseLogin.events({
  "change .selectCourseLogin":function(event){
    event.preventDefault();
    var courseId=$('[id=selectCourseLogin]').val();
    Session.setPersistent("currentCourse",courseId);
    Router.go('/course/'+courseId);
    Session.set("currentCourseEnroll","");
  },

  "change .selectCourseEnroll":function(event){
    event.preventDefault();
    var course=Courses.findOne({_id:$('[id=selectCourseEnroll]').val()});
    if(course.enrollKey==="" || course.enrollKey===undefined){
      Courses.update(course._id,{
        $push: {enrolledUserIds:Meteor.userId()}
      });
      Users.update({_id:Meteor.user()._id}, { $push: {enrolledCourseIds:course._id} });
      Session.setPersistent("currentCourse",course._id);
      Session.set("currentCourseEnroll","");
    }
    else{
      Session.setPersistent("currentCourseEnroll",$('[id=selectCourseEnroll]').val());
    }
  },

  "click .enrollButton":function(event){
    event.preventDefault();
    var enrollKey=$('[name=enrollKey]').val();
    var course=Courses.findOne({_id:Session.get("currentCourseEnroll")});
    if (enrollKey === course.enrollKey){
      Courses.update(course._id,{
        $push: {enrolledUserIds:Meteor.userId()}
      });
      Users.update({_id:Meteor.user()._id}, { $push: {enrolledCourseIds:course._id} });
      Session.setPersistent("currentCourse",course._id);
      Session.set("currentCourseEnroll","");
    }
  }


});




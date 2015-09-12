Template.courseLogin.onCreated(function(){
 Session.setPersistent("currentCourseEnroll","");
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
     return course.name+" ("+course.semester+" "+course.year+")";
    }
  }, 

  needToEnroll:function(){
    var currentCourseEnroll=Session.get("currentCourseEnroll");
    if(currentCourseEnroll==="" || currentCourseEnroll=== undefined)return false;
    return true;
  },

  availableCourses:function(){
    var currentUser=Meteor.userId();
    return Courses.find({$or:[{createdBy_id:currentUser},{enrolledUserIds:currentUser}]});
  },

  availableCoursesAll:function(){
    var currentUser=Meteor.userId();
    return Courses.find({$and:[{createdBy_id:{$ne:currentUser}},{enrolledUserIds:{$ne:currentUser}} ]});
  },

});

Template.courseLogin.events({
  "change .selectCourseLogin":function(event){
    event.preventDefault();
    Session.setPersistent("currentCourse",$('[id=selectCourseLogin]').val());
  },

  "change .selectCourseEnroll":function(event){
    event.preventDefault();
    var course=Courses.findOne({_id:$('[id=selectCourseEnroll]').val()});
    if(course.enrollKey==="" || course.enrollKey===undefined){
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
      Session.setPeristent("currentCourse",course._id);
      Session.set("currentCourseEnroll","");
    }
  }


});




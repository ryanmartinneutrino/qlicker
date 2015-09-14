Template.course.helpers({

  currentCourseInfo:function(){
    var currentCourse=Session.get("currentCourse");
    if( currentCourse==="" || currentCourse === undefined)return "";
    else{
     var course=Courses.findOne({_id:currentCourse});
     if(course) return course.name+" ("+course.semester+" "+course.year+")";
    }
  }

});

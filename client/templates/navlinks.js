
Template.navlinks.helpers({
  activeIfTemplateIs: function (template) {
    var currentTemplate = Router.current().lookupTemplate();
    if(currentTemplate === template)return 'active';
    else return '';      
  },
  formattedName:function(){
    if(Meteor.user()){
      var user= Users.findOne({_id:Meteor.userId()});
      if(user) return user.firstName +" "+user.lastName;
    }
    else return "";
  },
  currentCourseInfo:function(){
    var currentCourse=Session.get("currentCourse");
    if( currentCourse==="" || currentCourse === undefined)return "";
    else{
     var course=Courses.findOne({_id:currentCourse});
     if(course) return course.name+" ("+course.semester+" "+course.year+")";
    }
  },
  currentCourseId:function(){
    var currentCourse=Session.get("currentCourse");
    if( currentCourse==="" || currentCourse === undefined)return "";
    else return currentCourse;
  },

  loggedIntoCourse: function(){
    var currentCourse=Session.get("currentCourse");
    if(currentCourse==="" || currentCourse=== undefined)return false;
    return true;
  }  

});

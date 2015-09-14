Template.newCourse.onRendered(function(){
  var validator =  $('.newCourse').validate({
    submitHandler:  function(event){
      var name = $('[name=name]').val();
      var semester = $('[name=semester]').val();
      var year = $('[name=year]').val();
      var enrollKey = $('[name=enrollKey]').val();
      var createdById = Meteor.userId();
      var course={
        name:name,
        semester:semester,
        year:year,
        createdById:createdById,
        enrollKey:enrollKey,
        questionIds:[],
        sessionIds:[],
        enrolledUserIds:[]  
      }
      var newCourseId=Courses.insert(course,function(error){
          if(error){
            validator.showErrors({
              name:error.reason
            });
          }
          else{
            Users.update({_id:Meteor.userId()},
              {$push: {createdCourseIds:newCourseId}});
            Router.go("/courseLogin");
          }
        }
      );
     Session.setPersistent("currentCourse",newCourseId);
   } 
  });
});

Template.newCourse.events({
  "submit form": function(event){
    event.preventDefault();
    //rest of submit is handled by the submitHandler of the validator
  }


});

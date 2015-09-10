Template.newCourse.onRendered(function(){
  var validator =  $('.newCourse').validate({
    submitHandler:  function(event){
     // event.preventDefault();
      var name = $('[name=name]').val();
      var semester = $('[name=semester]').val();
      var year = $('[name=year]').val();
      var course={name:name,semester:semester,year:year}
      Courses.insert(course,function(error){
          if(error){
            validator.showErrors({
              name:error.reason
            });
          }
          else Router.go("/");
        }
      );
   } 
  });
});

Template.newCourse.events({
  "submit form": function(event){
    event.preventDefault();
    //rest of submit is handled by the submitHandler of the validator
  }


});

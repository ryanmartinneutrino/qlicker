Template.newQuestion.rendered = function(){

var arrayOfImageIds = [];

    Dropzone.autoDiscover = false;

    // Adds file uploading and adds the imageID of the file uploaded
    // to the arrayOfImageIds object.

    var dropzone = new Dropzone("form#dropzone", {
        accept: function(file, done){
            Images.insert(file, function(err, fileObj){
                if(err){
                  alert("Error");
                } else {
                  // gets the ID of the image that was uploaded
                  var imageId = fileObj._id;
                  // do something with this image ID, like save it somewhere
                  arrayOfImageIds.push(imageId);
                };
            });
        }
    });

}

Template.newQuestion.onRendered(function(){
  var validator =  $('.newQuestion').validate({
    submitHandler:  function(event){
      var qtitle = $('[name=qtitle]').val();
      var isPublic = $('[name=isPublic]').is(":checked");
      var nAnswers=Session.get("nAnswers");
      var courseId = $('[name=selectCourse]').val();
      var answers = [];
      for(var i=0;i<nAnswers;i++){
        ansId="ans_"+i;
        if(nAnswers<2){
          answers.push({ansId:i,ans: $("[name="+ansId+"]").val(), votes:0});
        }
        else{
          var isCorrect = $("[name="+ansId+"_correct]").is(":checked");
          answers.push({ansId:i,ans: $("[name="+ansId+"]").val(), isCorrect:isCorrect, votes:0});
        }
      }
      var question = {
        qtitle:qtitle,
        isPublic:isPublic,
        courseIds:[courseId],
        nAnswers:nAnswers,
        answers:answers,
        createdById:Meteor.userId()        
      };
      var qid=Questions.insert(question);
      Courses.update(courseId,{
        $push: {questionIds:qid}
      });
      Router.go('/');
   }
  });//end of validate()
});

Template.newQuestion.onCreated(function(){
  Session.set("nAnswers",1);
});

Template.newQuestion.helpers({

  loggedIntoCourse: function(){
    var currentCourse=Session.get("currentCourse");
    if(currentCourse==="" || currentCourse=== undefined)return false;
    else return true;
  },

  currentCourseInfo:function(){
    var currentCourse=Session.get("currentCourse");
    if( currentCourse==="" || currentCourse === undefined)return "Not logged into any course";
    else{
     var course=Courses.findOne({_id:currentCourse});
     return course.name+" ("+course.semester+" "+course.year+")";
    }
  }, 
 
  selectIfLoggedIn:function(courseId){
    var currentCourse=Session.get("currentCourse");
    if(currentCourse===courseId)return "selected";
    else return "";
  },

  checkedIfLoggedIntoCourse:function(){
    var currentCourse=Session.get("currentCourse");
    if(currentCourse==="" || currentCourse=== undefined)return "checked";
    else return "";
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

  moreThanOneAnswer:function(){
    var nAnswers=Session.get("nAnswers");
    if(nAnswers>1)return true;
    else return false;
  },
  answers:function(){
    var answerArray = [];
    var nAnswers=Session.get("nAnswers");
    var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    for (var i=0;i<nAnswers;i++){
      answerArray.push({ansid:"ans_"+i,letter:alphabet[i]});
    }
    return answerArray;  
  }

});


Template.newQuestion.events({
  "change .selectCourse":function(event){
    event.preventDefault();
    Session.setPersistent("currentCourse",$('[id=selectCourse]').val());
  },
 
  "ondrop .upload-drop-zone":function(event){
    event.preventDefault();
    console.log(event.dataTransfer.files);
  },

  "click .addAnswerButton":function(event){
    event.preventDefault();
    var nAnswers=Session.get("nAnswers")+1;
    Session.set("nAnswers",nAnswers);
  },

  "click .removeAnswerButton":function(event){
    event.preventDefault();
    var nAnswers=Session.get("nAnswers")-1;
    if(nAnswers<1)return;
    Session.set("nAnswers",nAnswers);
  },

  "submit .newQuestion":function(event){
    event.preventDefault();

  }



});



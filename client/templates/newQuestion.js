
Template.newQuestion.onCreated(function(){
  Session.set("nAnswers",1);
});

Template.newQuestion.helpers({

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
 
  selectIfLoggedIn:function(courseId){
    var currentCourse=Session.get("currentCourse");
    if(currentCourse===courseId)return "selected";
    else return "";
  },

  availableCourses:function(){
    var currentUser=Meteor.userId();
    return Courses.find({$or:[{createdBy_id:currentUser},{enrolledUserIds:currentUser}]});
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
      answerArray.push({id:"ans_"+i,letter:alphabet[i]});
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
  }


});



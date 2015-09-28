//TODO: dropzone accept does not set fileURl for the submit button to understand...

Template.newQuestion.rendered = function(){
    Dropzone.autoDiscover = false;
    var dropzone = new Dropzone("form#dropzone", {
        dictDefaultMessage:"Click or drag and drop an image",
        accept: function(file, done){
            Images.insert(file, function(err, fileObj){
                if(err){
                  alert("Error");
                } else {
                  // gets the ID of the image that was uploaded
                  var imageId = fileObj._id;
                  Session.set("imageId",imageId);
                };
            });
        }
    });

}

Template.newQuestion.onRendered(function(){

  Session.set("fileUrl","");
  var validator =  $('.newQuestion').validate({
    submitHandler:  function(event){
      var qtitle = $('[name=qtitle]').val();
      var isPublic = $('[name=isPublic]').is(":checked");
      var nAnswers=Session.get("nAnswers");
      var courseId = $('[name=selectCourse]').val();
      var answers = [];
      var date= new Date();
      var fileUrl="";
      var image=Images.findOne({_id:Session.get("imageId")});
      if(image)fileUrl=image.url();
      //TODO: NEED TO FILL ANSWERKEY WITH ISCORRECT ARRAY
      for(var i=0;i<nAnswers;i++){
        ansId="ans_"+i;
        if(nAnswers<2){
          answers.push({ansId:i,ans: $("[name="+ansId+"]").val()});
        }
        else{
          var isCorrect = $("[name="+ansId+"_correct]").is(":checked");
          answers.push({ansId:i,ans: $("[name="+ansId+"]").val(), isCorrect:isCorrect});
        }
      }
      var question = {
        qtitle:qtitle,
        isPublic:isPublic,
        courseIds:[courseId],
        nAnswers:nAnswers,
        answers:answers,
        createdById:Meteor.userId(),
        createdAt:date,
        fileUrl:fileUrl        
      };
      var qid=Questions.insert(question);
      Courses.update(courseId,{
        $push: {questionIds:qid}
      });
      var answerKey={
        questionId:qid,
        answers:answers,//<<---- TODO HERE!!!!!
        createdById:Meteor.userId(),
        createdAt:date
      }
     AnswerKeys.insert(answerKey);
     Router.go('/');
   }
  });//end of validate()
});

Template.newQuestion.onCreated(function(){
  Session.set("nAnswers",1);
});

Template.newQuestion.helpers({
  image: function(){
    return Images.find().fetch()[1];
  },
  fileUrl: function(){
   var imageId=Session.get("imageId");
   if(imageId)return Images.findOne({_id:imageId}).url();
   else return "";
  },
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



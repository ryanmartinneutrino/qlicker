Template.sessionRun.helpers({

  questionsInSession:function(){
    var sid="";
    if(this)sid=this._id;
    questions=QuestionsInSessions.find({sessionId:sid});
    if(questions)return questions;
    else return [];
  },
 
});









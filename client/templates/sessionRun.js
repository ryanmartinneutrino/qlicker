Template.sessionRun.helpers({

  questionsInSession:function(){
    var sid="";
    if(this.session)sid=this.session._id;
    //questions=QuestionsInSessions.find({sessionId:Template.parentData().session._id});
    questions=QuestionsInSessions.find({sessionId:sid});
    if(questions)return questions;
    else return [];
  },
 
});









//TODO get the sesions data from session Edit, then make this more liek the question Control
Template.addRemoveQuestionFromSession.helpers({
  sessionId:function(){
    return Template.parentData().session._id;
  }


});

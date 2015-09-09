  Template.question.events({
    "click .delete":function (){
      Questions.remove(this._id);
    }
  });


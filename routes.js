Router.configure({
  layoutTemplate:'main-layout'
});

Router.route('/',{
  template: 'courseLogin',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      Router.go('/login');
    }
  }
});

Router.route('/register',{
  template:'register'
});

Router.route('/login',{
  template:'login'
});

Router.route('/logout',{
  onBeforeAction: function(){
    Meteor.logout();
    Router.go('/login');
  }

 });

Router.route('/courseLogout',{
  onBeforeAction: function(){
    Session.set("currentCourse","");
    Router.go('/courseLogin');
  }

 });


Router.route('/newCourse',{
  template:'newCourse',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      Router.go('/login'); 
    }
  }

});


Router.route('/newQuestion',{
  template:'newQuestion',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      Router.go('/login');
    }
  }
});

Router.route('/courseLogin',{
  template:'courseLogin',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      Router.go('/login');
    }
  }
});

Router.route('/course/:_id',{
  template:'course',
  onBeforeAction: function(){
    //check if user is allowed to login to course:
    var cid=this.params._id;
    var uid=Meteor.userId();
    var user=Users.findOne({_id:uid});
    var enrolledCourseIds=user.enrolledCourseIds;
    var createdCourseIds=user.createdCourseIds;
    if(enrolledCourseIds.indexOf(cid)<0 && createdCourseIds.indexOf(cid)<0){
      Router.go('/courseLogin');
    }    
    else{
      Session.setPersistent("currentCourse",cid);
      this.next();
    }
  },
  data: function(){
    var currentCourse=this.params._id;
    return Courses.findOne({_id:currentCourse});
  }

});

/*
Router.route('/question/:_id',{
  template:'question',
  onBeforeAction: function(){
    this.next();
  },
  data: function(){
    var qid=this.params._id;
    return Questions.findOne({_id:qid});
  }

});
*/

Router.route('/course/:courseId/session/:sessionId',{
  template:'session',
  onBeforeAction: function(){
    this.next();
  },
  data: function(){
    var sid=this.params.sessionId;
    return Sessions.findOne({_id:sid});
  }

});

Router.route('/course/:courseId/session/run/:sessionId',{
  template:'sessionRun',
  onBeforeAction:function(){
    var courseId=this.params.courseId;
    var sessionId=this.params.sessionId;
    Courses.update({_id:courseId},{$set:{currentSessionId:sessionId}});
    this.next();
  },
  data: function(){
    var courseId=this.params.courseId;
    var sessionId=this.params.sessionId;

    return {course:Courses.findOne({_id:courseId}),
            session:Sessions.findOne({_id:sessionId})};

  }

});

Router.route('/course/:courseId/session/stop/:sessionId',{
  template:'course',
  onBeforeAction:function(){
    var courseId=this.params.courseId;
    var sessionId=this.params.sessionId;
    Courses.update({_id:courseId},{$set:{currentSessionId:""}});
    this.next();
  },
  data: function(){
    var currentCourse=this.params.courseId;
    return Courses.findOne({_id:currentCourse});
  }

});



Router.route('/course/:courseId/session/edit/:sessionId',{
  template:'sessionEdit',
  data: function(){
    var courseId=this.params.courseId;
    var sessionId=this.params.sessionId;

    return {course:Courses.findOne({_id:courseId}),
            session:Sessions.findOne({_id:sessionId})};

  }

});

Router.route('/course/:courseId/session/delete/:sessionId',{
  template:'course',
  onBeforeAction:function(){
    Sessions.remove({_id:this.params.sessionId});
    //Courses.update({_id:this.params.courseId},{$pull : {sessionIds:this.params.sessionId}} );
    this.next();
  },
  data: function(){
    var currentCourse=this.params.courseId;
    return Courses.findOne({_id:currentCourse});
  }
  
});


Router.route('/course/:courseId/session/:sessionId/add/question/:questionId',{
  template:'sessionEdit',
  onBeforeAction:function(){
    if(QuestionsInSessions.findOne({_id:this.params.questionId})==undefined){
      var questionInSession={
        questionId:this.params.questionId,
        sessionId:this.params.sessionId,
        courseId:this.params.courseId,
        maxSubmits:1,
        isActive:false,
        showVotes:true,
        responseIds:[]
      };
      QuestionsInSessions.insert(questionInSession);
      Sessions.update({_id:this.params.sessionId},{$push :{questionIds:this.params.questionId}});
    }
    this.next();
  },
  data: function(){
    var courseId=this.params.courseId;
    var sessionId=this.params.sessionId;

    return {course:Courses.findOne({_id:courseId}),
            session:Sessions.findOne({_id:sessionId})};
  }

});

Router.route('/course/:courseId/session/:sessionId/remove/question/:questionId',{
  template:'sessionEdit',
  onBeforeAction:function(){
    Sessions.update({_id:this.params.sessionId},{$pull :{questionIds:this.params.questionId}});
    var qis=QuestionsInSessions.findOne({$and:[{questionId:this.params.questionId},{sessionId:this.params.sessionId}]});
    QuestionsInSessions.remove(qis._id);
    this.next();
  },
  data: function(){
    var courseId=this.params.courseId;
    var sessionId=this.params.sessionId;

    return {course:Courses.findOne({_id:courseId}),
            session:Sessions.findOne({_id:sessionId})};
  }

});






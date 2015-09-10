Meteor.startup(function(){

  //Add some data into the databases
  if(Institutions.find().count()=== 0){
    Institutions.insert({name:"Queen's"});
  }

  if(Courses.find().count()===0){
    course={
      name:"phys250",
      institution_id: "xxxx",
      year: "2016",
      semester: "winter",
      createdBy_id: "xxxx",
      adminRights_ids: [ {user_id:"xxxx"}, {user_id:"xxxx"} ],
      activeSession_ids: [ {session_id:"xxxx"},{session_id:"xxxx"} ],
      session_ids: [ {session_id:"xxxx"},{session_id:"xxxx"} ]
    };
    Courses.insert(course);
  }
  
  if(Sessions.find().count()==0){
    session={
      course_id: "xxxx",
      createdBy_id: "xxxx",
      quizList_ids: [ {quiz_id:"xxxx" }, {quiz_id:"xxxx"}],
      adminRights_ids: [ {user_id:"xxxx"}, {user_id:"xxxx"} ],
      studentAttended_ids: [ {student_id:"xxx"}, {student_id:"xxxx"} ],
      date:"X"
    };
    Sessions.insert(session);
  }

  if(Questions.find().count()===0){
    question={
      course_id:"xxxx",
      qtitle:"Who is Einstein?",
      imgLink:"http://vignette3.wikia.nocookie.net/adventuretimewithfinnandjake/images/5/59/Hipster-llama-l.jpg/revision/latest?cb=20140531170030",
      answers:[
        {ans:"A Physicist", correct:true},
        {ans:"A comedian", correct:true},
        {ans:"A baby", correct:false} 
      ],
      correctAnswers:[{correctAns:answers[0]}],      
      sessionUsed_ids:[{session_id:"xxxx"},{session_id:"xxxx"} ],
      createdBy_id:"xxxx"
    };
    Questions.insert(question);
  }
  
  if(Quizzes.find().count()===0){
    quiz={
      course_id:"xxxx",
      question_ids:[{question_id:"xxxx"},{question_id:"xxxx"} ],
      sessionUsed_ids:[{session_id:"xxxx"},{session_id:"xxxx"} ]
    };
    Quizzes.insert(quiz);

  }

  if(StudentResults.find().count()===0){
    studentresult={
      student_id:"xxxx",
      session_id:"xxxx",
      quiz_id:"xxxx",
      question_id:"xxxx",
      answers:[{ans:"X"},{ans:"Y"}]
    };
    StudentResults.insert(studentresult);

  }




});

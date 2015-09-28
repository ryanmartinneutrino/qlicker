Questions = new Mongo.Collection("questions");
AnswerKeys = new Mongo.Collection("answerKeys");
//Users to store additional information on users, out of the Meteor.users
Users = new Mongo.Collection("qusers");
Institutions = new Mongo.Collection("institutions");
Courses = new Mongo.Collection("courses");
Sessions = new Mongo.Collection("sessions");
//Store additional information about questions related to a session (to avoid having to create a single question per session)
QuestionsInSessions = new Mongo.Collection("questionsInSessions");
Quizzes =  new Mongo.Collection("quizzes");
Responses = new Mongo.Collection("responses");
Images = new FS.Collection("images", {
// stores: [new FS.Store.FileSystem("images", {path: "/home/rmartin/qlicker/uploads"})]
  stores: [new FS.Store.GridFS("myImages")]
});



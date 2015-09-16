Questions = new Mongo.Collection("questions");
Users = new Mongo.Collection("qusers");
Institutions = new Mongo.Collection("institutions");
Courses = new Mongo.Collection("courses");
Sessions = new Mongo.Collection("sessions");
Quizzes =  new Mongo.Collection("quizzes");
Responses = new Mongo.Collection("responses");
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "/home/rmartin/qlicker/uploads"})]
});



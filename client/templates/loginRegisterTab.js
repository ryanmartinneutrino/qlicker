Template.loginRegisterTab.onCreated(function(){
  if(Router.current().route.path()==="/login")Session.set("loginTabActive",true);
  else Session.set("loginTabActive",false);
});

Template.loginRegisterTab.helpers({
  loginTabActive:function(){
    return Session.get("loginTabActive");
  }
});

Template.navlinks.helpers({
  activeIfTemplateIs: function (template) {
    var currentTemplate = Router.current().lookupTemplate();
    if(currentTemplate === template)return 'active';
    else return '';      
  },
  formattedName:function(){
    if(Meteor.user()){
      var user= Users.findOne({_id:Meteor.userId()});
      return user.firstName +" "+user.lastName;
    }
    else return "";
  }

});

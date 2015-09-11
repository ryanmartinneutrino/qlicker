Template.navlinks.helpers({
    activeIfTemplateIs: function (template) {
      var currentTemplate = Router.current().lookupTemplate();
      if(currentTemplate === template)return 'active';
      else return '';      
    }
  });

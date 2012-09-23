define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("homePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['homePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div class=\"home-page\">\n\n   <div>Home</div>\n\n</div>";}); 
Handlebars.registerPartial("homePageTemplate", templates["homePageTemplate"]); 
return templates["homePageTemplate"]; 
});
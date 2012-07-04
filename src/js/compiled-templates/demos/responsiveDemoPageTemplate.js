define(["use!handlebars", "core/util/log"], function(Handlebars, log){ 
log("responsiveDemoPageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['responsiveDemoPageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div>\n    Responsive\n</div>";}); 
Handlebars.registerPartial("responsiveDemoPageTemplate", templates["responsiveDemoPageTemplate"]); 
return templates["responsiveDemoPageTemplate"]; 
});
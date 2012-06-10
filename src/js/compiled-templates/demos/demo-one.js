define(["use!handlebars", "core/util/log"], function(Handlebars, log){ 
log("demo-one precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['demo-one'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div>\n    I am demo one\n</div>";}); 
Handlebars.registerPartial("demo-one", templates["demo-one"]); 
return templates["demo-one"]; 
});
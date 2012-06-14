define(["use!handlebars", "core/util/log"], function(Handlebars, log){ 
log("buttonsDemoPage precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['buttonsDemoPage'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"buttonsDemo\">\n    <input type=\"submit\" class=\"button-type-1\" value=\"1\">\n    <input type=\"submit\" class=\"button-type-2\" value=\"2\">\n    <input type=\"submit\" class=\"button-type-3\" value=\"3\">\n    <input type=\"submit\" class=\"button-type-4\" value=\"4\"> a\n</div>";}); 
Handlebars.registerPartial("buttonsDemoPage", templates["buttonsDemoPage"]); 
return templates["buttonsDemoPage"]; 
});
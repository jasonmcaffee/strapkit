define(["use!handlebars", "core/util/log"], function(Handlebars, log){ 
log("buttonsDemoPage precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['buttonsDemoPage'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"buttonsDemo\" ontouchstart=\"\">\n    <h2>Buttons</h2>\n\n    <h3>Demo</h3>\n    <input type=\"submit\" class=\"button-type-1\" value=\"1\">\n    <input type=\"submit\" class=\"button-type-2\" value=\"2\">\n    <input type=\"submit\" class=\"button-type-3\" value=\"3\">\n    <input type=\"submit\" class=\"button-type-4\" value=\"4\">\n    <input type=\"submit\" class=\"button-type-5\" value=\"5\">\n    <input type=\"submit\" class=\"button-type-6\" value=\"6\">\n\n    <h3>Caveats</h3>\n    <p>You'll notice that the containing div id=\"buttonsDemo\" contains an attribute ontouchstart=\"\"</p>\n    <p>This allows the :active pseudo selector to actually fire on android and ios</p>\n</div>";}); 
Handlebars.registerPartial("buttonsDemoPage", templates["buttonsDemoPage"]); 
return templates["buttonsDemoPage"]; 
});
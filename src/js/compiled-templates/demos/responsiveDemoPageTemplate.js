define(["use!handlebars", "core/util/log"], function(Handlebars, log){ 
log("responsiveDemoPageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['responsiveDemoPageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"responsive-page\">\n\n    <h1>Master Detail List</h1>\n\n    <ul id=\"masterList\">\n        <li>Item 1</li>\n        <li>Item 2</li>\n        <li>Item 3</li>\n    </ul>\n\n    <ul id=\"detailList\">\n        <li>Detail 1</li>\n        <li>Detail 2</li>\n        <li>Detail 3</li>\n    </ul>\n</div>";}); 
Handlebars.registerPartial("responsiveDemoPageTemplate", templates["responsiveDemoPageTemplate"]); 
return templates["responsiveDemoPageTemplate"]; 
});
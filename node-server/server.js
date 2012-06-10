/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var connect = require('connect');
var port = 4000;

var public = path.resolve(__dirname + '/../dist'); //jason's initial poc

var app = express.createServer();

app.configure(function(){


     // Parses form encoded data so we can get it in json form
    app.use(express.bodyParser());

    // The methodOverride middleware allows Express apps to behave like RESTful apps, as popularised by Rails; HTTP methods like PUT can be used through hidden inputs
    app.use(express.methodOverride());

    app.use(express.static(public));//jason's poc
    app.use(connect.compress());//gzip functionality
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


});


//server side templating =========================================================================
var ejs = require('ejs');//view engine for templates
ejs.open = 'µ';
ejs.close = 'µ';
app.set('view engine', 'ejs');//we are using ejs for server side templating
app.set('view options', { layout: false }); //i don't need layouts right now
app.register('.html', require('ejs'));//all .html files served up will be considered ejs templates.

var config = {
    viewsDirectory : __dirname + '/views/'
};


app.get('/', function(req,res){
    console.log('modern-mobile home');
    var viewModel = {
        viewModel:{

        }
    };
    res.render(config.viewsDirectory + 'test.html', viewModel);
});



//================================================================================





// Start server.
console.log('Starting modern-browser server on port ' + port);
app.listen(port);



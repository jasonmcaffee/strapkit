/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var connect = require('connect');
var gzippo = require('gzippo');

var port = 4000;

//where we are serving our static files from
var public = path.resolve(__dirname + '/../dist');

var app = express.createServer();

var fs = require('fs');
app.configure(function(){


     // Parses form encoded data so we can get it in json form
    app.use(express.bodyParser());

    // The methodOverride middleware allows Express apps to behave like RESTful apps, as popularised by Rails; HTTP methods like PUT can be used through hidden inputs
    app.use(express.methodOverride());

    //gzip all static files in public folder (js, css, etc)
    app.use(gzippo.staticGzip(public));

    //gzips the server side template views
    app.use(connect.compress());//gzip functionality

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    app.use(express.logger({
        'stream' : fs.createWriteStream(__dirname+'/../logs/node.log',{flags: 'a'})
    }));

});


//server side templating =========================================================================
var ejs = require('ejs');//view engine for templates
ejs.open = 'µ';//eliminate conflicts with clientside templating by using our own open and close tags for ejs templates.
ejs.close = 'µ';
app.set('view engine', 'ejs');//we are using ejs for server side templating
app.set('view options', { layout: false }); //i don't need layouts right now
app.register('.html', require('ejs'));//all .html files served up will be considered ejs templates.

var config = {
    viewsDirectory : __dirname + '/views/'
};


app.get('/', function(req,res){
    console.log('strapkit home');
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



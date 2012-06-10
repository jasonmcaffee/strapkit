#Strapkit

##Overview
This project is meant to provide a nice starting point for developing a web application targeting modern browsers.


##Libraries Used
### Server Side
* Node.js
* express.js
* ejs - server side templating
* r.js/require.js - amd optimization (build modules into 1 js)
* grunt.js - for running the build of javascript & css source

### Client Side
* Backbone - Model and View definitions, routing.
* Handlebars - Just the runtime, as we precompile templates at build
* Require.js - For asynchronous module definitions.
* Jquery - dom event and manipulation. feel free to replace with zepto, etc.

##Patterns
### Single Page Application (Optional)
### MVC (Optional)
### Client Side Templating


##Installation
Pre-requisites:
* node.js
* npm

### run npm install
from the root directory (contains package.json), run the following command:
`npm install`
This will install the dependencies found in package.json and should result in a folder called node_modules under the root directory

##Building
The build process will combine, minimize/optimize your js and css found in the src directory.

###Build Command
to do a full build, cd into the build directory and run
`grunt`
this will run the default task defined in build/grunt.js, and will place the built files into the dist directory

### Build Steps

#### build-app
Command `grunt build-app`

#### compile-handlebars-templates
Command `grunt build-app`

## useful resources
http://www.w3counter.com/globalstats.php




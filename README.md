#Strapkit
http://strapkit.com
https://twitter.com/#!/strapkit
strapkit@gmail.com


##Overview
This project is meant to provide a starting point for rapidly developing a web application targeting modern browsers.

##Features
###Predefined Build Process
Strapkit utilizes node.js and grunt.js to facilitate building optimized code.
Currently all js and css is combined into 1 file, to mitigate http requests, but we will soon provide an Enterprise version of strapkit to allow for logical bundling and downloading of modules/resources.

###Glues Together Popular Libraries
We've done the research and performance testing, and have chosen the best js libraries and frameworks so you can get to producing a top-notch, modern site as quickly as possible.

###Demos
http://strapkit.com is built using strapkit, and is included in the source so that you can examine and learn best practices, as well as gain insight on how to solve common problems.

###Focused on Performance

###Meaningful and Intuitive Project Structure

##Libraries Used
### Server Side
* Node.js - server js runtime
* express.js - mvc framework
* ejs - server side templating
* gzippo - static file gzip compression
* r.js/require.js - amd optimization (build modules into 1 js)
* grunt.js - for running the build of javascript & css source
* stylus - css preprocessor with extend and mixins.

### Client Side
* Backbone - Model and View definitions, routing.
* Handlebars - Just the runtime, as we precompile templates at build
* Require.js - For asynchronous module definitions.
* Jquery - dom event and manipulation. feel free to replace with zepto, etc.

##Patterns
### Single Page Application (Optional)

### MVC (Optional)

### Client Side Templating & Precompilation


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

#### optimize js by uglifying it, minimizing it, and combining it into 1 .js file
Command `grunt build-app`

#### compile html templates to handlebars template functions
Command `grunt compile-handlebars-templates`

#### compile stylus files to css
Command `grunt compile-stylus-files`

#### concat css files into 1 .css file
Command `grunt build-css`

## useful resources
http://www.w3counter.com/globalstats.php

##Automated Building
You probably don't want to manually run the build each time you modify a template or preprocessed css file (.styl).
We've included watch tasks which monitor the appropriate source directories, and call the needed build commands.
To get this functionality, you'll need to open a new tab or terminal window and run:
`grunt watch`
Now when you make changes to the src files, you should see the watch console indicate that the building of the app is occurring.




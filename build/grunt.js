//todo: (lower priority) - make all requirejs optimizer calls which minify js (optimize:true) run in a separate worker process if possible
module.exports = function(grunt) {
    console.log(process.cwd());
    //pretend like we are working in the parent directory.
    process.chdir('..');
    var rootDirectory = process.cwd();

    //config for various build tasks and helpers.
    var config = {
        cssSource : rootDirectory + '/src/css',
        jsSource : rootDirectory + '/src/js',
        distPublic : rootDirectory + '/dist',
        templatesSourceDir :  rootDirectory + '/src/templates',
        templatesDistDir : rootDirectory + '/src/js/compiled-templates'
    };
    config.cssDistDir = config.distPublic + '/css';
    config.jsDistDir = config.distPublic + '/js';
    config.cssDistFile = config.cssDistDir + '/app.css';


    // Project configuration.
    grunt.initConfig({
        general:{
            cssSource : config.cssSource
        },
        //css preprocessor
        css : {
            preprocessSourceDir : rootDirectory + '/src/css-preprocess',
            preprocessOutputDir : rootDirectory + '/src/css/compiled-css',
            cssDistDir: config.cssDistDir,
            cssDistFile: config.cssDistFile,
            cssSource: config.cssSource

        },
        //stylus file watcher - compile to css then concat css to dist
        watch:{
//            stylusWatch:{
//                files: [rootDirectory + '/src/css-preprocess/*.styl'],
//                tasks: 'compile-stylus-and-build-css'
//            },
            cssWatch:{
                files: [rootDirectory + '/src/css/compiled-css/*.css'],
                tasks: 'build-css'
            }
//            ,
//            templateWatch:{       //this currently doesn't work well. the compile-template task is not finishing before build-app is called.
//                files: [config.templatesSourceDir + '/**/*.html'],
//                tasks: 'compile-templates-and-build-app'
//            }//,
//            compiledTemplateWatch:{
//                files: [config.templatesDistDir + '/**/*.js'],
//                tasks: 'build-app'
//            }
        }
    });


//============================================================================================================== Build Tasks
    /**
     * Uses require to build app-built.js into the dist/js folder.
     */
    grunt.registerTask('build-app', function(){
        console.log('build-app task has been called.');
        var requirejs = require('requirejs');

        var config = {
            baseUrl: 'src/js',
            out: 'dist/js/app-built.js',
            paths: {
                'jquery' : 'lib-third-party/jquery',
                'underscore' : 'lib-third-party/underscore',
                'backbone' : 'lib-third-party/backbone',
                'requireLib' : 'lib-third-party/require',  //allow app-built to be bundled with requirejs
                'use' : 'lib-third-party/use',
                'handlebars' : 'lib-third-party/handlebars.runtime' //we don't need all of Handlebars, since we are precompiling templates
            },

            //the modules we will be building
            modules: [
                {
                    name:'app',
                    include:['requireLib']  //bundle requirejs with app-built
                }
            ],

            //use plugin config for wrapping non-amd compliant code
            use:{
                handlebars:{
                    attach : 'Handlebars'
                },
                underscore :{
                    attach : '_'
                },
                'backbone': {
                    deps: ['use!underscore', 'jquery'],
                    attach: 'Backbone'
                }
            }
        };

        var taskDone = this.async();//grunt async task management


        requirejs.optimize(config, function (buildResponse) {
            taskDone(true);
        });

    });



    /**
     * Builds a single dist/public/css/core-built.css for core css files in src/public/css/core
     */
    grunt.registerTask("build-css-old", function(){
        //iterate over all css files in the directory and dynamically create list of css files to combine
        var cssFiles = recursivelyScanDirectoryAndBuildArrayOfFilePaths(config.cssSource);
        console.log('build-css has found ' + cssFiles.length + ' css files to concat.');

        //concat all css files into 1.
        var concatenatedCss = grunt.helper('concat', cssFiles);

        //write the new file
        var taskDone = this.async();//grunt async task management
        var fs = require('fs');

        //write the css file
        fs.writeFile(config.cssDistFile, concatenatedCss, function(err){
            if(err){
                console.log('build-css task failed in creating '+ config.cssDistFile +' with error: ' + err);
                taskDone(false);
            }else{
                console.log('build-css success');
                taskDone(true);
            }
        });


    });





    /**
     * generates a require module for every template in the src/templates directory
     * the module will return the function used to generate html.
     * It is important to understand that when you load a precompiled template module by including it in your define,
     * the registration of the template function in both
     * Handlebars.templates['templateName'] and
     * Handlebars.registerPartial('templateName', Handlebars.templates['templateName']);
     * will happen immediately.
     * todo: instead of coding the template below inline, move to a template. INCEPTION
     * todo: right now template names must be unique, regardless of directory, as handlebars only allows letters in registered templates?? using _ or - to indicate accounts_accountsPageTemplate doesn't work.
     * https://github.com/jwietelmann/node-handlebars-precompiler/blob/master/handlebars-precompiler.js
     */
    grunt.registerTask('compile-handlebars-templates', function(){

        //precompileHandlebarsTemplate(config.templatesSourceDir + '/testTemplate.html', 'testTemplate', '/testTemplate.js');
        //precompileHandlebarsTemplate(config.templatesSourceDir + '/accounts/accountsPageTemplate.html', 'accountsPageTemplate', '/accountsPageTemplate.js');

        var filesAndDirectories = recursivelyScanDirectoryAndBuildArrayOfFilePathsAndBuildArrayOfDirPaths(config.templatesSourceDir);
        var filePaths = filesAndDirectories.arrayOfFilePaths;

        console.log('filesAndDirectories.arrayOfDirPaths.length ' + filesAndDirectories.arrayOfDirPaths.length);
        var taskDone = this.async();//allow the grunt task to be asynchronous

        //first make sure that all dirs exist in the destination directory (so we don't have to check each time in the below for loop).
        grunt.helper('ensureCompiledTemplatesDirHasSameFoldersAsSrcTemplates', filesAndDirectories, function(err){
            if(err){
                console.log('compile-handlebars-templates encountered error ensuring dirs exists: ' + err);
                taskDone(false);
            }else{

                //now that we are sure all the directories exist in the destination, start precompiling templates
                for(var i=0; i < filePaths.length; ++i){
                    var filePath = filePaths[i];

                    //using the filepath, construct meaningful modules, as well as the destination dir under compiled-templates.
                    //first establish the relative dir path by removing the template source dir path
                    var relativeFilePath = filePath.replace(config.templatesSourceDir, '');//get rid of src dir path
                    relativeFilePath = relativeFilePath.replace('.html', '');//get rid of .html extension
                    console.log('relativeFilePath is : ' + relativeFilePath);

                    //determine where the generated .js file with the compiled template will be placed
                    var destinationFilePath = config.templatesDistDir + relativeFilePath + '.js';
                    console.log('destinationFilePath is : ' + destinationFilePath);

                    //determine what the registered template & partial name for Handlebars (see function task comment)
                    //NOOOOOO ! This doesn't work in Handlebars --> the registered template and partial name will be relativeFilePath, replacing '/' with '-' <--
                    //Handlebars hates anything but letters in template name. UNIQUE TEMPLATE NAMES FOR NOW.
                    var registeredTemplateAndPartialName = relativeFilePath.substring(relativeFilePath.lastIndexOf('/') + 1);
                    console.log('registeredTemplateAndPartialName is : ' + registeredTemplateAndPartialName);

                    //now we are ready to compile the template
                    precompileHandlebarsTemplate(filePath, registeredTemplateAndPartialName, destinationFilePath);
                }


                taskDone(true);//indicate that this async grunt task has finished.
            }
        });
    });



    /**
     * Generates a requirejs module containing the precompiled version of the template. (ie the template function)
     * @param templatePath - required - full path to the .html template file
     * @param templateName - required - name of the template and partial as it will be registered with handlebars. eg Handlebars.template[templateName]; Handlebars.registerPartial(templateName, ...);
     * @param outputPathAndFileName - required - full path to where the compiled template should be placed.
     */
    function precompileHandlebarsTemplate(templatePath, templateName, outputPathAndFileName){
        var FILE_ENCODING = 'utf-8';
        var handlebars = require('Handlebars'), //use this to precompile templates from html to js
            fs = require('fs');

        //first grab the html from the template file
        var templateSrc = fs.readFileSync(templatePath, FILE_ENCODING);
        //generate the js function for the template
        var templateFunction = handlebars.precompile(templateSrc);
        //wrap the generated template function as a require js module
        var wrappedTemplateFunction = wrapCompiledHandlebarsTemplateAsModule(templateName, templateFunction);

        //write out the require module to disk.
        fs.writeFileSync(outputPathAndFileName, wrappedTemplateFunction, FILE_ENCODING);
        console.log('done compiling template ' + templateName);
    }

    /**
     * Wraps a generated template function as a requirejs module which returns the template function.
     * The template function will also be stored in Handlebars.templates["templateName"]
     *
     * @param templateName - required - the name of the template (usually generated by using the filename).
     * @param templateFunction - required - the result of calling require('Handlebars').precompile(). should be a function representation
     *                                      of the html template.
     */
    function wrapCompiledHandlebarsTemplateAsModule(templateName, templateFunction){
        var wrappedTemplateFunction =
            'define(["use!handlebars", "core/util/log"], function(Handlebars, log){ \n' +
                'log("' + templateName +' precompiled template function module loaded."); \n' +
                'var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; \n' +
                'templates[\'' + templateName + '\'] = template('  +
                templateFunction +
                '); \n' +
                'Handlebars.registerPartial("'+templateName+'", templates["'+ templateName +'"]); \n' + //everything is a partial and a template!
                'return templates["'+ templateName +'"]; \n' +
                '});'
            ;
        return wrappedTemplateFunction;
    }




//============================================================================================================== Helpers

    /**
     * Iterates over each folder and subfolder under src/templates and ensures/creates a corresponding folder under src/js/compiled templates.
     */
    grunt.registerHelper('ensureCompiledTemplatesDirHasSameFoldersAsSrcTemplates', function(filesAndDirectories, callback){
        var filesAndDirectories = filesAndDirectories || recursivelyScanDirectoryAndBuildArrayOfFilePathsAndBuildArrayOfDirPaths(config.templatesSourceDir);
        var dirPaths = filesAndDirectories.arrayOfDirPaths;

        //iterate over each directory in dirPaths and ensure it has corresponding compiled templates dir.
        for(var i=0; i < dirPaths.length; ++i){
            var dirPath = dirPaths[i];
            //trim off the templatesSourceDir
            var relativeDirPath = dirPath.replace(config.templatesSourceDir, '');
            console.log('relativeDirPath is : ' + relativeDirPath);
            var distDirPath = config.templatesDistDir + relativeDirPath;
            console.log('distDirPath is : ' + distDirPath);
            //now ensure the directory exists

            grunt.helper('ensureDirectoryExists', distDirPath,
                (function(currentIndex){
                    return function(err){
                        if(err){
                            console.log('ensureCompiledTemplatesDirHasSameFoldersAsSrcTemplates encountered error ensuring dir exists: ' + err);
                            callback(err);
                        }else{
                            if(currentIndex == dirPaths.length - 1){
                                callback();
                            }

                        }
                    };
                })(i)
            );
        }


    });


    /**
     * Ensures that a directory path exists, and if it doesn't, attempts to create the directory.
     * Any parent directories must already exist.
     * If you are calling this function from inside a task, you will need to use this.async() before calling this function.
     */
    grunt.registerHelper('ensureDirectoryExists', function(directoryPath, callback){
        console.log('gruntHelper ensureDirectoryExists has been called.');
        var fs = require('fs');
        fs.lstat(directoryPath, function(err, stats){
            if(!err && stats.isDirectory()){
                console.log('ensureDirectoryExists determined the directory already exists.');
                callback();
            }else{
                console.log('ensureDirectoryExists determined the directory does not exist. creating directory.');
                fs.mkdir(directoryPath, function(err){
                    if(err){
                        console.log('ensureDirectoryExists was unable to create the directory: ' + err);
                        callback(err);
                    }else{
                        console.log('ensureDirectoryExists successfully created the directory.');
                        callback();
                    }
                });
            }
        });
    });

    var fs = require('fs');

    /**
     * Scans an entire directory and subdirectories and builds a list of full file paths to files contained in folders.
     * @param basePath - directory which you wish to scan.
     * @param filesAndDirectories - optional - used for recursive calls
     * @param arrayOfFilePaths - optional - used for recursive calls
     */
    function recursivelyScanDirectoryAndBuildArrayOfFilePaths(basePath, filesAndDirectories, arrayOfFilePaths){

        if(!filesAndDirectories){
            filesAndDirectories =  fs.readdirSync(basePath);
        }
        if(!arrayOfFilePaths){
            arrayOfFilePaths = [];
        }

        for(var i=0; i < filesAndDirectories.length; ++i){
            var fileOrDirectory = filesAndDirectories[i];
            //we need the full path to the file or directory so we can pass it to lstat and determine if it's a directory
            var fullFileOrDirectoryPath = basePath + '/' + fileOrDirectory;
            console.log('recursivelyScanDirectoryAndBuildArrayOfFilePaths evaluating fileOrDirectory : ' + fullFileOrDirectoryPath);

            try {
                //Get information about the file or directory, mainly to determine if it's a directory so we can recurse it.
                var stats = fs.lstatSync(fullFileOrDirectoryPath);

                //if it is a directory, call the recursively function to get sub files & dirs
                //if not, just add the file name to our array
                if (stats.isDirectory()) {
                    console.log(fileOrDirectory + ' is a directory. recursion will now occur');

                    var newBasePath = basePath + '/' + fileOrDirectory;
                    var newFilesAndDirectories = fs.readdirSync(newBasePath);//get the files and directories in this directory

                    recursivelyScanDirectoryAndBuildArrayOfFilePaths(newBasePath, newFilesAndDirectories, arrayOfFilePaths);
                }else if(stats.isFile()){ //it's a file

                    arrayOfFilePaths.push(fullFileOrDirectoryPath);
                }
            }
            catch (e) {
                console.log('error iterating over directories : ' + JSON.stringify(e));
                throw e;//ensure whatever task is calling us fails.
            }
        }

        return arrayOfFilePaths;
    }

    /**
     * Scans an entire directory and subdirectories and builds a list of full file paths to files contained in folders,
     * as well as a list of folder paths.
     * @param basePath - required - starting point for the scan
     * @param filesAndDirectories - optional - array of files and directories directly under the base path.
     * @param arrayOfFilePaths - optional - used for recursion
     * @param arrayOfDirPaths - optional - used
     */
    function recursivelyScanDirectoryAndBuildArrayOfFilePathsAndBuildArrayOfDirPaths(basePath, filesAndDirectories, arrayOfFilePaths, arrayOfDirPaths){
        if(!filesAndDirectories){
            filesAndDirectories =  fs.readdirSync(basePath);
        }
        if(!arrayOfFilePaths){arrayOfFilePaths = [];}
        if(!arrayOfDirPaths){arrayOfDirPaths = [];}

        //iterate over each file and/or directory in the base path, drilling down into sub dirs and aggregating arrays
        //of full file paths and full directory paths.
        for(var i=0; i < filesAndDirectories.length; ++i){
            var fileOrDirectory = filesAndDirectories[i]; //we don't know if it's a file or dir yet.
            //we need the full path to the file or directory so we can pass it to lstat and determine if it's a directory
            var fullFileOrDirectoryPath = basePath + '/' + fileOrDirectory;
            console.log('recursivelyScanDirectoryAndBuildArrayOfFilePathsAndBuildArrayOfDirPaths evaluating fileOrDirectory : ' + fullFileOrDirectoryPath);

            try {
                //Get information about the file or directory, mainly to determine if it's a directory so we can recurse it.
                var stats = fs.lstatSync(fullFileOrDirectoryPath);

                //if it is a directory, call the recursively function to get sub files & dirs
                //if not, just add the file name to our array
                if (stats.isDirectory()) {
                    console.log(fileOrDirectory + ' is a directory. recursion will now occur');

                    //construct full path to the directory
                    var newBasePath = basePath + '/' + fileOrDirectory;

                    //add the directory path to our array of dir paths
                    arrayOfDirPaths.push(newBasePath);

                    //get the files and directories in this directory
                    var newFilesAndDirectories = fs.readdirSync(newBasePath);

                    //dive deeper into the dir sub folders, continuing to build paths
                    recursivelyScanDirectoryAndBuildArrayOfFilePathsAndBuildArrayOfDirPaths(newBasePath, newFilesAndDirectories, arrayOfFilePaths, arrayOfDirPaths);
                }else if(stats.isFile()){ //it's a file

                    arrayOfFilePaths.push(fullFileOrDirectoryPath);
                }
            }
            catch (e) {
                console.log('error iterating over directories : ' + JSON.stringify(e));
                throw e;//ensure whatever task is calling us fails.
            }
        }

        //return an object literal containing both arrays.
        return {
            arrayOfFilePaths : arrayOfFilePaths,
            arrayOfDirPaths: arrayOfDirPaths
        };
    }

    //major build tasks
    grunt.registerTask("compile-templates-and-build-app", "compile-handlebars-templates build-app");
    grunt.registerTask('compile-stylus-and-build-css', 'compile-stylus-files build-css');
    grunt.registerTask("build", "compile-handlebars-templates build-app compile-stylus-files build-css");
    grunt.registerTask("dist", "build");
    grunt.registerTask("default", "dist");

    //load our tasks from the tasks folder
    grunt.loadTasks('build/tasks');

};


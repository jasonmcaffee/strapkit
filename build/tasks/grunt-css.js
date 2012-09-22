module.exports = function(grunt){
     var log = grunt.log.write;
    var config = grunt.config('css');

      //  sass --watch src/css-preprocess:src/css/compiled-css
    grunt.registerTask('sass-watch', function(){
        log('sass-watch now running');
        var spawn =  require('child_process').spawn;

        //var commandLineToBeExecuted  = "sass --watch src/css-preprocess:src/css/compiled-css";
        //var sassWatch = spawn('sass', ['--watch', 'src/css-preprocess:src/css/compiled-css']);
        var sassWatch = spawn('sass', ['--watch', config.preprocessSourceDir+':'+config.preprocessOutputDir]);

        var taskDone = this.async();

        sassWatch.stdout.on('data', function(data){
            log('sass-watch stdout : ' + data);
//            log('now calling build-css...');
//            grunt.helper('build-css');

        });

        sassWatch.stderr.on('data', function(data){
            log('sass-watch stderror : ' + data);
        });

        sassWatch.on('exit', function(code){
            log('sass-watch exit : ' + code);
            taskDone(true);
        });


    });

//    grunt.registerHelper("build-css", function(){
//        log('build-css called and is concating css files from source: ' + config.cssSource);
//        var compiledCssFiles = grunt.helper('recursivelyScanDirectoryAndBuildArrayOfFilePaths', config.cssSource);
//        log('found ' + compiledCssFiles.length + ' css files to concat');
//
//        var concatenatedCss = grunt.helper('concat', compiledCssFiles);
//        var fs = require('fs');
//        fs.writeFileSync(config.cssDistFile, concatenatedCss);
//
//        log('build-css is complete.');
//    });
//
//    /**
//     * Builds a single dist/public/css/core-built.css for core css files in src/public/css/core
//     */
//    grunt.registerTask("build-css", function(){
//        grunt.helper('build-css');
//
//
//    });
};


//console.log('sass-watch now running');
//var sassWatch = require('child_process').exec;
//
//var taskDone = this.async();
//
//var commandLineToBeExecuted  = "sass --watch src/css-preprocess:src/css/compiled-css";
//console.log("\n Command to be executed... \n", commandLineToBeExecuted);
//
//sassWatch(commandLineToBeExecuted, function(error, stdout, stderr){
//    if(error) {
//        console.log('error with sass-watch: ' + stderr + "\n\n");
//        taskDone(false);
//    } else {
//        console.log('sass-watch now watching \n\n' + stdout);
//        taskDone(true);
//    }
//});
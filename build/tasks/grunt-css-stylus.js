module.exports = function(grunt) {

    var stylusConfig = grunt.config('stylus');

    /**
     * Stylus output
     */
    grunt.registerTask('compile-stylus-files', function(){
        console.log('compile-stylus-files task called.');


        var taskDone = this.async();

        //scan all directories under the stylus config source directory and build an array of filepaths so we can compile each one.
        var stylusFilePaths = grunt.helper('recursivelyScanDirectoryAndBuildArrayOfFilePaths', stylusConfig.sourceDir);
        console.log('stylusFilePaths.length: ' + stylusFilePaths.length);

        for(var i=0; i < stylusFilePaths.length; ++i){
            //inputs
            var stylusFilePath = stylusFilePaths[i];

            //output file path and name
            var stylusFileName = stylusFilePath.substring(stylusFilePath.lastIndexOf('/') + 1);
            var cssFileName = stylusFileName.replace('.styl', '.css');//get rid of the .styl extension and add .css
            var cssFilePath = stylusConfig.outputDir + '/' + cssFileName;

            grunt.helper('compile-stylus-file', stylusFilePath, cssFilePath,
                function(err){
                    console.log('!!!!!!error - ' + err);
                    taskDone(false);

                    throw err;
                },
                function(){
                    console.log('success!' + i);  //weird magic. this is only firing at the end. thought i'd need an IIFE...
                    taskDone(true);
                }
            );
        }

    });

    /**
     *  Compiles a single .styl file into a .css, which is written to the specified cssOutputFilePath
     *  @param - stylusFilePath - the full path the the stylus file which you wish to have compiled to css. e.g. "/Users/jason/dev/app/src/stylus-files/my.styl"
     *
     */
    grunt.registerHelper('compile-stylus-file', function(stylusFilePath, cssOutputFilePath, errorCallback, successCallback){
        var stylus = require('stylus');
        var fs = require('fs');
        var stylusFileString = fs.readFileSync(stylusFilePath, 'utf8');

        stylus.render(stylusFileString, function(err, compiledCss){
            if(err) return errorCallback(err);

            console.log('stylus compile complete for file: ' + stylusFilePath);

            //write the css file
            fs.writeFile(cssOutputFilePath, compiledCss, function(err){
                if(err){
                    console.log('compile-stylus-file failed in creating '+ cssOutputFilePath +' with error: ' + err);
                    errorCallback(err)
                }else{
                    console.log('compile-stylus-file success in creating '+ cssOutputFilePath);
                    successCallback();
                }
            });
        });
    });

};
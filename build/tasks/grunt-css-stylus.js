module.exports = function(grunt) {

    /**
     * Stylus output
     */
    grunt.registerTask('compile-stylus', function(){
        console.log('stylus task called.');
        var stylusConfig = grunt.config('stylus');
        console.log('stylus config : ' + stylusConfig.sourceDir);

        var stylus = require('stylus');
        var fs = require('fs');
        var cssFileString = fs.readFileSync(stylusConfig.sourceDir + '/demo-one.styl', 'utf8');

        var taskDone = this.async();
        stylus.render(cssFileString, function(err, compiledCss){
            console.log('stylus render complete.');
            if(err) throw err;

            console.log(compiledCss);
        });

    });

};
module.exports = function(grunt){
     var log = grunt.log.write;

      //  sass --watch src/css-preprocess:src/css/compiled-css
    grunt.registerTask('sass-watch', function(){
        log('sass-watch now running');
        var spawn =  require('child_process').spawn;

        var commandLineToBeExecuted  = "sass --watch src/css-preprocess:src/css/compiled-css";
        var sassWatch = spawn('sass', ['--watch', 'src/css-preprocess:src/css/compiled-css']);

        var taskDone = this.async();

        log("\n Command to be executed... \n" + commandLineToBeExecuted);

        sassWatch.stdout.on('data', function(data){
            log('sass-watch stdout : ' + data);
        });

        sassWatch.stderr.on('data', function(data){
            log('sass-watch stderror : ' + data);
        });

        sassWatch.on('exit', function(code){
            log('sass-watch exit : ' + code);
            taskDone(true);
        });


    });
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
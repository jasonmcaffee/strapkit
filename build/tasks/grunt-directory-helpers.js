module.exports = function(grunt){

    /**
     * Scans an entire directory and subdirectories and builds a list of full file paths to files contained in folders.
     * @param basePath - directory which you wish to scan.
     * @param filesAndDirectories - optional - used for recursive calls
     * @param arrayOfFilePaths - optional - used for recursive calls
     */
    grunt.registerHelper('recursivelyScanDirectoryAndBuildArrayOfFilePaths', function(basePath, filesAndDirectories, arrayOfFilePaths){
        var fs = require('fs');

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
    });


};
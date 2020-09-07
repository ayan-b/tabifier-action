const recursive = require("recursive-readdir");
const path = require("path");
const fs = require("fs");

const tabLength = 4 | process.env.INPUT_TABLENGTH;

function replaceSpacesWithTabs(string) {
    let splittedString = string.split(/\r?\n/);
    let tabifiedString = '';
    for (let line of splittedString) {
        let count = 0;
        for (let char of line) {
            if (char == ' ') {
                ++count;
            } else {
                break;
            }
        }
        let modifiedLine = line.replace(/^[ ]+/, '');
        let tabCount = Math.ceil(count / tabLength);
        modifiedLine = '\t'.repeat(tabCount) + modifiedLine;
        tabifiedString += modifiedLine + '\n';
    }
    return tabifiedString.slice(0, -1);
}

function ignoreFunc(file, stats) {
    // `file` is the path to the file, and `stats` is an `fs.Stats`
    // object returned from `fs.lstat()`.
    return stats.isDirectory() && (path.basename(file) == "node_modules" || path.basename(file) == ".git" || path.basename(file) == ".github");
}

recursive(".", [".gitignore", ignoreFunc], function (err, files) {
    for (let file of files) {
        fs.readFile(file, 'utf8', function(err, data){ 
            let tabifiedData = replaceSpacesWithTabs(data);
            fs.writeFile(file, tabifiedData, function(err){
                if (err) {
                    console.log(err);
                }
            })
        }); 
    }
});

const
    walk = require('walk'),
    fs = require('fs'),
    opencc = require('opencc');


const 
    skippedDirs = require('./skipped.json'),
    dir = process.argv[2],
    ccMode = process.argv[3];

if(!skippedDirs){
    console.log('Please provide skipped.json in current directory');
    process.exit(0);
}
if(!dir) {
    console.log('Please provide dir name in second args');
    process.exit(0);
}
if(!ccMode){
    console.log('Please provide OpenCC json name without .json in second args');
    process.exit(0);
}

console.log(`Walking in directory '${dir}'`)
run(dir, ccMode, skippedDirs);


function run(dir, ccMode, skippedDirs){

    // Init
    let options = {
        followLinks: false
        // directories with these keys will be skipped
      , filters: skippedDirs
    };

    let walker = walk.walk(dir, options);
    let cc = new opencc(`${ccMode}.json`)

    // Set callback
    walker.on("directories", function (root, dirStatsArray, next) {
        // dirStatsArray is an array of `stat` objects with the additional attributes
        // * type
        // * error
        // * name
        next();
    });

    walker.on("file", function (root, fileStats, next) {

        console.log(`${root}/${fileStats.name}`);
        let content = fs.readFileSync(`${root}/${fileStats.name}`, 'utf-8');
        //console.log(content);

        let converted = cc.convertSync(content);
        //console.log(converted);
        
        fs.writeFileSync(`${root}/${fileStats.name}`, converted)

        next();
    });

    walker.on("errors", function (root, nodeStatsArray, next) {
        next();
    });

    walker.on("end", function () {
        console.log("Walking is done");
    });

}
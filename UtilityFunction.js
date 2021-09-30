const readLine = require('linebyline');

//file name is the name of the file
//keyword array is an array of keywords to look in the file for
function SearchForKeyword(fileName, KeywordArray) {
    //create file read stream
    let inputFile = readLine(fileName);
    ///console.log("entering function");
    //create promise for returning array of matches
    let returnPromise = new Promise((resolve, reject) => {
        //any matches we will find
        let MatchesArray = [];
        //async call to read each line of file
        inputFile.on('line', (line, lineCount, byteCount) => {
            ///console.log('entering line read');
            //split out keywords
            let lineArray = line.split('%');
            //loop though every keyword skipping the first as it has the link and keyword 
            for (let i = 1; i < lineArray.length; i++) {
                console.log("search lines");
                //loop though every keyword and check for matches
                for (let j = 0; j < KeywordArray.length; j++) {
                    console.log('search keywords', j, KeywordArray[j]);
                    //if the keyword matches the list of keywords add line to array and break
                    if (lineArray[i].indexOf(KeywordArray[j]) != -1) {
                        console.log(`Match Found with ${lineArray[i].indexOf(KeywordArray[j])} with ${lineArray[i]}`);
                        //we got a hit, add the while line to the array
                        let formattedLine = lineArray[0].split('|');
                        lineArray.shift();
                        let fullLine = formattedLine.concat(lineArray);
                        MatchesArray.push(fullLine);
                        console.log(fullLine);
                    }
                }
            }
            console.log('promise Resolving');
            //with searching done resolve promise
            resolve(MatchesArray);
        }).on('error', (e) => {
            console.log('we hit an error oh no', e);
            reject('on no its broken');
        })
    });

    return returnPromise;
}

module.exports.SearchForKeyword = SearchForKeyword;
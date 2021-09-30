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
            let lineKeywords = line.split('%');
            let breakout = true;
            //loop though every keyword skipping the first as it has the link and keyword 
            for (let i = 1; i < lineKeywords.length; i++) {
                console.log(`search line ${i}`);
                //loop though every keyword and check for matches
                for (let j = 0; j < KeywordArray.length; j++) {
                    console.log('search keywords', j, KeywordArray[j]);
                    //if the keyword matches the list of keywords add line to array and break
                    if (lineKeywords[i].indexOf(KeywordArray[j]) != -1 && breakout) {
                        console.log(`Match Found with ${lineKeywords[i] == KeywordArray[j]} with ${lineKeywords[i]}`);
                        //we got a hit, add the while line to the array
                        let formattedLine = lineKeywords[0].split('|');
                        lineKeywords.shift();
                        let fullLine = formattedLine.concat(lineKeywords);
                        MatchesArray.push(fullLine);
                        console.log(fullLine);
                        breakout = false;
                    }
                }
            }
        }).on('error', (e) => {
            console.log('we hit an error oh no', e);
            reject('on no its broken');
        }).on('end', ()=>{
            console.log(`READ FILE ENDED`);
            
            console.log('promise Resolving');
            //with searching done resolve promise
            resolve(MatchesArray);
        })
    });

    return returnPromise;
}

module.exports.SearchForKeyword = SearchForKeyword;
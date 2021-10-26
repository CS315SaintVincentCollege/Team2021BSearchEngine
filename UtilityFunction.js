const readLine = require('linebyline');

//file name is the name of the file
//keyword array is an array of keywords to look in the file for
function SearchForKeyword(fileName, KeywordArray) {

    //create file read stream
    let inputFile = readLine(fileName);
    
    //create promise for returning array of matches
    let returnPromise = new Promise((resolve, reject) => {

        //any matches we will find
        let MatchesArray = [];
        
        //async call to read each line of file
        inputFile.on('line', (line, lineCount, byteCount) => {
                        
            //split out keywords
            let lineKeywords = line.split('%');
            
            //break out of upcoming for loop when false
            let breakout = true;

            //loop though every keyword skipping the first as it has the link and keyword 
            for (let i = 1; i < lineKeywords.length; i++) {
                
                //loop though every keyword and check for matches
                for (let j = 0; j < KeywordArray.length; j++) {
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
            //An error occured opening the keywords file
            console.log('Error Occured', e);
            reject(undefined);
        }).on('end', ()=>{
            //end of keywords file hit returning anything that was matched
            //with searching done resolve promise
            console.log(MatchesArray);
            resolve(MatchesArray);
        })
    });

    return returnPromise;
}

module.exports.SearchForKeyword = SearchForKeyword;

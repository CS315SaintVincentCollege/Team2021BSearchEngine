const express = require('express');
const SearchForKeyword = require('./UtilityFunction.js').SearchForKeyword;

let app = express();

console.clear();

//localhost:3002/api/search/?keyword1=word
app.get('/api/search/', async (request, resolution)=>{
    //console.log(Object.keys(request));
    //console.log(Object.keys(resolution));

    //console.log(request.query);
    let queryParams = Object.values(request.query);
    //TODO: search function still not working hitting twice on same peram
    let result = await SearchForKeyword('testFile.txt', queryParams);

    resolution.send(result);
});

app.listen(8080);

/*
(async function() {
    console.log(await SearchForKeyword('testFile.txt', ['bees']));
})();
*/
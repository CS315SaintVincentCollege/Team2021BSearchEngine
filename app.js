const express = require('express');
const SearchForKeyword = require('./UtilityFunction.js').SearchForKeyword;
const fs = require('fs');

let app = express();

console.clear();

app.get('/', (request, resolution)=>{
    let page = fs.readFileSync('Public/index.html');
    resolution.sendFile(page);
    resolution.sendStatus(200);
})

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
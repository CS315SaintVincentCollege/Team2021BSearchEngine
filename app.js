const express = require('express');
const SearchForKeyword = require('./UtilityFunction.js').SearchForKeyword;
const fs = require('fs');

let app = express();

console.clear();

app.get('/', (request, resolution)=>{
    //let page = fs.readFileSync('./Public/index.html');
    //resolution.send(page);
    resolution.sendFile('./Public/index.html', { root: __dirname });
})

app.get(/^\/search*/, (request, resolution)=>{
    resolution.sendFile('./Public/search.html', {root: __dirname});
})

app.get(/^\/Public\/style.css/, (request, resolution)=>{
    //let page = fs.readFileSync('./Public/index.html');
    //resolution.send(page);
    resolution.sendFile('./Public/style.css', { root: __dirname });
})

//localhost:3002/api/search/?keyword1=word
app.get('/api/search/', async (request, resolution)=>{
    //console.log(Object.keys(request));
    //console.log(Object.keys(resolution));

    //console.log(request);

    //console.log(request.query);
    let queryParams = Object.values(request.query);
    if (queryParams == "") {
        console.log("you didnt anyting");
        resolution.send(JSON.stringify({undefined}));
        return;
    }
    let result = await SearchForKeyword('testFile.txt', queryParams);

    resolution.send(result);
});

app.get('/images/:name', (request, resolution)=>{
    let filename = request.params.name;
    let fileData = fs.readFileSync('./Images/' + filename);
    console.log(`filename ${filename}`);
    resolution.send(fileData);
})

app.listen(8081);

/*
(async function() {
    console.log(await SearchForKeyword('testFile.txt', ['bees']));
})();
*/
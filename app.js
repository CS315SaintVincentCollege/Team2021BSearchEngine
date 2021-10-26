//Required node.js packages
const express = require('express');
const SearchForKeyword = require('./UtilityFunction.js').SearchForKeyword;
const fs = require('fs');

let app = express();

console.clear();

/***The following are routes used in the app***/

//Route for the home page.
app.get('/', (request, resolution)=>{
    resolution.sendFile('./Public/index.html', { root: __dirname });
})

//Route for /search*
app.get(/^\/search*/, (request, resolution)=>{
    resolution.sendFile('./Public/search.html', {root: __dirname});
})

//Route for app CSS.
app.get(/^\/Public\/style.css/, (request, resolution)=>{
    resolution.sendFile('./Public/style.css', { root: __dirname });
})

//Route for search API. When submit is hit on the form, this is the API that gets hit.
//localhost:3002/api/search/?keyword1=word
app.get('/api/search/', async (request, resolution)=>{

    let queryParams = Object.values(request.query);

    //If the search is empty.
    if (queryParams == "") {
        console.log("Nothing Sent");
        resolution.send(JSON.stringify({undefined}));
        return;
    }

    let result = await SearchForKeyword('/www/cgi-bin/keywordfile3', queryParams);

    resolution.send(result);
});

//Routes for any image anywhere on the app.
app.get('/images/:name', (request, resolution)=>{

    let filename = request.params.name;
    let fileData = fs.readFileSync('./Images/' + filename);

    console.log(`filename ${filename}`);
    
    resolution.send(fileData);
})

app.listen(3002);

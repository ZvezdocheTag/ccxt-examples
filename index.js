
const express = require('express');
const app = express();
const getMarkets = require('./examples/allUnifyMethods');

app.get('/',  function (req, res) {
    getMarkets().then(obj => {
        res.send(obj);
    })
    
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
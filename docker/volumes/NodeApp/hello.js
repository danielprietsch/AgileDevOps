// v1.8
var express = require('express');
var app = express();

var os = require('os');
var dns = require('dns');

var h = os.hostname();

app.get('/', function (req, res) {
res.send('v1.8: Hello World! Iam an Nodejs App! My CONTAINER ID is: ' + h);
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});





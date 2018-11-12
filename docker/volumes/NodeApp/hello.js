var express = require('express');
var app = express();

var os = require('os');
var dns = require('dns');

var h = os.hostname();

app.get('/', function (req, res) {
res.send('UQDN: ' + h);
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});

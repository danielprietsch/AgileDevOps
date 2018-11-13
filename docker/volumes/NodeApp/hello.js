// v1.8
var express = require('express');
var app = express();

var os = require('os');
var dns = require('dns');

var h = os.hostname();
var timer=0;
function startTimer()
{
        setInterval("timerUp()",2);
}

function timerUp()
{
        timer++;
        var resetat=2; //change this number to adjust the length of time in seconds
        if(timer==resetat)
        {
                window.location.reload();
        }
        var tleft=resetat-timer;
        document.getElementById('timer').innerHTML=tleft;
}


app.get('/', function (req, res) {
res.send('v1.8: Hello World!  My CONTAINER ID is: ' + h);
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});





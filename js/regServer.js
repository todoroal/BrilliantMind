const http = require('http');
const port = 3000;

const server = http.createServer(function(req, res){
    res.write('First server');
    res.end();
})

server.listen(port, function(error){
    if(error){
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port);
    }
})


/*var express = require('express');
var app = express();

app.get('/', function (rew, res){
    res. send('Hello AMK!');
})

var server = app.listen(8081, funtion () {
    let host = server.address().address,
    let port = server.address().port,
    



})*/
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 5050;
var numberOfClients = 0;

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(client){
  numberOfClients++;
  console.log('a client has connected', numberOfClients);
  client.on('disconnect', function(){
    console.log('a client has disconnected');
    numberOfClients--;
  })
});

server.listen(port, function(){
  console.log('app listening to port', port);
});
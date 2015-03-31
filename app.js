var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 5050;
var drawConfigs = require('./serverFiles/drawConfigs.js');
var numberOfClients = 0;

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(client){
  numberOfClients++;
  var color = drawConfigs.generateRandomColor();
  console.log('a client has connected', numberOfClients);
  console.log('their color is', color);
  client.emit("color", color);
  client.on('drawPath', function(data){
    console.log(data);
  });


  client.on('disconnect', function(){
    console.log('a client has disconnected');
    numberOfClients--;
  })
});

server.listen(port, function(){
  console.log('app listening to port', port);
});
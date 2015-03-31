var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 5050;
var draw = require('./serverFiles/drawConfigs.js');
var numberOfClients = 0;
var clientColors = {};
app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(client){
  numberOfClients++;

  var color = draw.generateRandomColor();
  console.log('A client has connected.  Total number of clients: ', numberOfClients);
  console.log('their color is', color);
  console.log(client.id);
  client.emit("color", color);

  client.on('drawPath', function(data, session){
    console.log('user in session', session);
    console.log('is drawing this', data);
    client.broadcast.emit('drawPath', data );
  });


  client.on('disconnect', function(){
    console.log('a client has disconnected');
    numberOfClients--;
  })
});

server.listen(port, function(){
  console.log('app listening to port', port);
});
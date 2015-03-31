var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 5050;
var draw = require('./serverFiles/drawHelpers.js');
var numberOfClients = 0;
var paths = [];
app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(client){
  // Upon client connection, increase the number of clients connected, and assign that client a color.
  // Emit them their color data and any paths,'drawings', that may already exist in this room.
  // The paths variable above contains all the current drawings for the room, we will clear that out if there are no connected users.  
  numberOfClients++;
  var color = draw.generateRandomColor();
  console.log('Number of paths upon connection', paths.length);
  var data = {
    color: color,
    paths: paths,
    clients: numberOfClients
  };
  client.emit("color", data);

  // When we receive a drawing, we'll store that drawing in our path storage array, and emit that drawing to everyone else
  client.on('drawPath', function(data, session){
    paths.push(data);
    client.broadcast.emit('drawPath', data );
  });

  // When a user disconnects, we decrease the number of connected clients, and make sure that we still have users in the room.
  // If there are no more users in the room, we will reset the paths variable to contain no drawings.
  client.on('disconnect', function(){
    numberOfClients--;
    if(numberOfClients === 0){
      paths = [];
    }
  });
});

server.listen(port, function(){
  console.log('app listening to port', port);
});
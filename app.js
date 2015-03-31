var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 5050;
var draw = require('./serverFiles/drawHelpers.js');
var numberOfClients = 0;
var paths;
app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(client){
  numberOfClients++;
  var color = draw.generateRandomColor();
  console.log('A client has connected.  Total number of clients: ', numberOfClients);
  console.log('their color is', color);
  console.log('PATHS on connection', paths);
  var data = {
    color: color,
    paths: paths,
    clients: numberOfClients
  }
  client.emit("color", data);


  client.on('drawPath', function(data, session){
    console.log('user in session', session);
    console.log('is drawing this', data);
    if(!paths){
      paths = new Array();
    }
    paths.push(data);
    console.log('length of our current paths', paths.length);
    client.broadcast.emit('drawPath', data );
  });


  client.on('disconnect', function(){
    numberOfClients--;
    console.log('a client has disconnected, number of clients remaining', numberOfClients);
    if(numberOfClients === 0){
      console.log('no clients, reseting paths');
      paths.pop();
    }
  })
});

server.listen(port, function(){
  console.log('app listening to port', port);
});
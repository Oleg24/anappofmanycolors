var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 5050;
var drawConfigs = require('./serverFiles/drawConfigs.js');
var numberOfClients = 0;
var clientColors = {};
app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(client){
  numberOfClients++;

  // TODO: refactor this findColor code to the drawConfigs
  function findColor(client){
    var found = false;
    console.log('executing')
    for(var key in clientColors){
      if(client.id === key){
        found = true;
        return clientColors[key];
      }
    }
    if(!found){
      var temp = drawConfigs.generateRandomColor();
      console.log('temporary', temp);
      return clientColors[client.id] = temp;      
    }
  };
  var color = findColor(client);
  // var color = drawConfigs.generateRandomColor();
  console.log('a client has connected', numberOfClients);
  console.log('their color is', color);
  console.log(client.id);

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
// THIS FILE USES THE PAPER.js LIBRARY
var myPath, anotherPath, color; 

function onMouseDown(event) {
  myPath = new Path();
  myPath.strokeColor = color;
  myPath.strokeWidth = 10;
}

function onMouseDrag(event){
  myPath.add(event.point);
  emitPath(myPath, event);
}

function emitPath(path, event) {
  var sessionId = socket.id;
  var data = {
    segments : path.segments,
    strokeColor : path.strokeColor,
    strokeWidth : path.strokeWidth,
    point : event.point
  };
  socket.emit('drawPath', data, sessionId );
}
  
function drawPath(data){
  var newSegments = data.segments.map(function(segment){
    return new Point(segment[1], segment[2]);
  });
  var anotherPath = new Path(newSegments);
  anotherPath.strokeWidth = data.strokeWidth;
  anotherPath.strokeColor = data.strokeColor;
  view.draw();
}

function drawAllExistingPaths(data){
  data.forEach(function(item){
    setTimeout(drawPath(item), 0)
  });
}
///////////////////////////
////  Socket Listeners ////
///////////////////////////

socket.on('drawPath', function(data) {
  drawPath(data);
});

socket.on('color', function(data){
  color = data.color;
  if(data.clients > 1 && data.paths){
    drawAllExistingPaths(data.paths);
  }
});
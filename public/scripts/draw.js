var myPath;
var anotherPath;
var color; 

function onMouseDown(event) {
  // mouseDowns++;
  myPath = new Path();
  myPath.strokeColor = color;
  myPath.strokeWidth = 10;
}

function onMouseDrag(event){
    myPath.add(event.point);
    emitPath(myPath, event);
    // console.log('this is the path that we are sending', myPath);
}

function emitPath(path, event) {
    console.log('event we are sending', event.point);
    var sessionId = socket.id;
    var data = {
        segments : path.segments,
        strokeColor : path.strokeColor,
        strokeWidth : path.strokeWidth,
        point : event.point
    };
    socket.emit('drawPath', data, sessionId );
    // console.log('this is the data we are emitting', data);
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
///////////////////////////
////  Socket Listeners ////
///////////////////////////

socket.on('drawPath', function(data) {
    console.log( 'we are receiving data');
    drawPath(data);
});

socket.on('color', function(data){
  console.log('my color from draw.js', data);
  color = data;
});
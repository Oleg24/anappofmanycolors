// var mouseDowns = 0;
var myPath;
var anotherPath;

function onMouseDown(event) {
  // mouseDowns++;
  myPath = new Path();
  myPath.strokeColor ='black';
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
    console.log('this is the data we are emitting', data);
}
  
function drawPath(data){
  var newSegments = data.segments.map(function(segment){
    return new Point(segment[1], segment[2]);
  });
  console.log(newSegments);
  var anotherPath = new Path(newSegments);
  anotherPath.strokeWidth = data.strokeWidth;
  anotherPath.strokeColor = 'black';
  view.draw();
}

socket.on( 'drawPath', function(data) {
    console.log( 'this is the data we are recieving:', data );
    drawPath(data);
})
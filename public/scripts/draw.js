var mouseDowns = 0;
// Create a new path once, when the script is executed:
var myPath = new Path();
myPath.strokeColor = 'black';

// This function is called whenever the user
// clicks the mouse in the view:
function onMouseDown(event) {
  mouseDowns++;
  // Add a segment to the path at the position of the mouse:
  myPath.add(event.point);
  var x = event.middlePoint.x;
  // if(mouseDowns > 1){
    var y = event.middlePoint.y;
    console.log('x', x);
    console.log('y', y);
    emitPath(x, y);
  // }
}


function emitPath( x, y) {

    // Each Socket.IO connection has a unique session id
    var sessionId = socket.id;
  
    // An object to describe the circle's draw data
    var data = {
        x: x,
        y: y,
        // color: color
    };

    // send a 'drawCircle' event with data and sessionId to the server
    socket.emit( 'drawPath', data, sessionId );
    // Lets have a look at the data we're sending
    console.log( data )
}
// var events = require('events');

// var eventEmitter = new events.EventEmitter();

// //Create an event handler:
// var myEventHandler = function () {
//   console.log('I hear a scream!');
// }
// var serverResponse;

// //Assign the event handler to an event:
// eventEmitter.on('scream', myEventHandler);

// //Fire the 'scream' event:
// eventEmitter.emit('scream');
// http.createServer(function (req, res) {
//     serverResponse = res;
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World!');
//   }).listen(8080);

var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  //Open a file on the server and return its content:
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8800);
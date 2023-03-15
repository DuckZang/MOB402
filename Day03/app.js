var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.appendFile('FileUpload/data/newfile.txt', 'abc', function (err) {
        if (err) throw err;
        console.log('Saved111');
      });
    res.write('dang lam viec voi file ....')
    res.end();
  
}).listen(8080);
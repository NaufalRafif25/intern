var http = require('http');
const port = 3000
//create a server object:
http.createServer(function (req, res) {res.writeHead(200,{'Content-Type':'text/html','Content-Length':body.length})
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
})
.listen(port); //the server object listens on port 3000
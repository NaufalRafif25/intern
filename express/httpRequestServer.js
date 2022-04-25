// Done
const http = require("http");
const port = 3000
const Server = http.createServer((request, response) => {
 
 if (request.method == 'POST') {
  let buff = '' //buffer variable to save response
  request.on('data', function (chunk) {
   buff += chunk; //concat each newline to the buff variable
  })
request.on('end', function () {
  console.log('Body' + buff); //print out variable content
  response.end("Body accepted" ); 
 })
 } 
else {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello');
 }
})
.listen(port);
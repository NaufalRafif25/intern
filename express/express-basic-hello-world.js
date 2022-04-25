// Done
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res)=> { //get method
  res.send('Hello World') //send response
})
// app.listen(3000)
app.listen(port, ( ) => {
    console.log('Node.js web server at port ${port} is running..')
})
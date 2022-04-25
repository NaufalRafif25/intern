// Done
const express = require('express')
const app = express()
const port = 3000

// app.get('/',(req,res)=>{
//     console.log("at root")
// })
app.get('/naufal', (req,res)=>{
    res.send('Hello World') //send response
    console.log('at url named: Naufal');
})
app.listen(port, ( ) => {
    console.log('Node.js web server at port ${port} is running..')
})
const express = require('express')
const app = express()

app.get('/', (res,req)=> {
    console.log("request received at URL")
    console.log(req.body)
    res.send("Hello world!")
})
app.get('/user', (res,req)=> {
    console.log("request received at URL of user")
    console.log(req.body)
    res.send("Hello User!")
})
app.post('/', (res,req)=> {
    console.log("request received at URL of root")
    console.log(req.body)
    res.send("data received")
})
app.post('/user', (res,req)=> {
    console.log("request received at URL of user")
    console.log(req.body)
    res.send("Data received")
})
app.listen(3000, function( ) {
    console.log("listening on port 3000")
})
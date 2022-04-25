const express= require('express')
const app = express()

app.post('/',(req,res)=>{ //POST request submitted at root page
    console.log("request received at URL of root")
    console.log(req.body)
    res.send("data received")
})
app.post('/naufal', (req,res)=>{ //
    console.log("request received at URL of naufal")
    console.log(req.body)
    res.send("Data received")
})
app.listen(3000)
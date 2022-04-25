const express = require('express')
const app = express()

app.get('/get1', (req,res)=> {
    console.log(req.body)
    res.send([
        {
            title: "sweater crewneck pria GOOD termurah /bahan fleece lembut dan tebal",
            normal_price: "90.000" ,
            diskon_price: "35.100" ,
            rating_bintang: "4"
        },
        {
            title: "DISTRO II SABLON DIGITAL BERKUALITAS|| KAOS PRIA WANITA",
            normal_price: "35.000" ,
            diskon_price: "13.900 - 18.900" ,
            rating_bintang: "4.3"
        }
    ])
})
app.post('/post1', (req,res)=> {
    console.log(req.body)
    const data = {
        status: true,
        message: 'Detail Data Post',
        data: [{
            title: "sweater crewneck pria GOOD termurah / bahan fleece lembut dan tebal",
            normal_price: 90000 ,
            diskon_price: 35100 ,
            rating_bintang: 4
        },
        {
            title: "DISTRO II SABLON DIGITAL BERKUALITAS|| KAOS PRIA WANITA",
            normal_price: 35000 ,
            diskon_price: 13900 +' - '+ 18900 ,
            rating_bintang: 4.3
        }]
    }
    res.send(data)
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
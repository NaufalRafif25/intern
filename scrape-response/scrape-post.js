const express = require('express')
const app = express()
const puppeteer = require('puppeteer')
const bodyParser = require('body-parser')

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://shopee.co.id/', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });
    await page.waitFor(5000);

    // ******************************** close popup
    await page.evaluate(() => {
        document.querySelector("#main > div > div:nth-child(4) > div > div > shopee-banner-popup-stateful").shadowRoot.querySelector("div > div > div > div > div").click();
       });
       await page.waitFor(6000);

    // ***************** Scroll page ke bawah
    await autoScroll(page);

    // ***************** Scraping data
    const result = await page.evaluate(() => {
        let data = [];
        
        let elements = document.querySelectorAll('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div');

        for (var element of elements) {
            let image = element.querySelector('a > div > div > div > img');
            let link =  element.querySelector('a');
            let title = element.querySelector('a > div > div > div > div > div > div');
            let price = element.querySelector('a > div > div > div > div > div > span:nth-child(2)');

            /// Cek kondisi jika image tidak ada
            /// kemarin error disini, image nya null tapi kamu masih mau akses
            if(image == null)continue;
            let imageUrl = image.getAttribute('src');
            let linkUrl = "https://shopee.co.id/"+link.getAttribute('href');
            let titleText = title.innerText;
            let priceText = price.innerText;
            
            data.push({imageUrl, linkUrl, titleText, priceText});
        }
        return data;
    });
    browser.close();
    return result;
}
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

scrape().then((value) => {
    console.log(value); // Success!
})

app.get('/get1', (req,res)=> {
    console.log(req.body)
    res.send(scrape.result)
})
app.post('/post1', (req,res)=> {
    console.log(req.body)
    const data = [scrape({ imageUrl: string, linkUrl: string, titleText: any, priceText: any })]
    res.send(data)
})
app.post('/post2', (req,res)=> {
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
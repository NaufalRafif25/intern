const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

// scrape
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://www.lazada.co.id/', {
        waitUntil: 'load',
        timeout: 0
    });
    await page.waitFor(5000);
    await autoScroll(page);

    const result = await page.evaluate(()=> {
        let data = [];
        let elements = document.querySelectorAll('div.card-jfy-item-wrapper');

        for(var element of elements) {
            let image = element.querySelector('.card-jfy-image > img').getAttribute('src');
            let title = element.querySelector('.card-jfy-title').innerText;
            let price = element.querySelector('.hp-mod-price-first-line > .price').innerText;
            let link = element.querySelector('.card-jfy-li-content').getAttribute('href');
            
            data.push({image,title, price, link});
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

// *********** post data
scrape().then((value) => {
    console.log(value); // Success!
})

app.get('/get1', (req,res)=> {
    console.log(req.body)
    res.send(scrape.result)
})
app.post('/post1', async (req,res)=> {
    console.log(req.body)
    const data = await scrape()
    res.send(data)
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
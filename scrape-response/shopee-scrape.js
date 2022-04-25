const puppeteer = require('puppeteer')

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
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
        
        let elements = document.querySelectorAll('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1)');

        for (var element of elements) {
            let image = element.querySelector('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._3XtrnR._39CZ3D > div._2vZTLo > div > img').getAttribute('src');

            let link = "https://shopee.co.id/"+element.querySelector('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a').getAttribute('href');

            let title = element.querySelector('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._3HQqWi > div._3uviLU > div > div').innerText;

            let price = element.querySelector('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._3HQqWi > div._1XMfVk._9Ytdqd > div._1VhsGo.PJJvAw > span:nth-child(2)').innerText;

            data.push({image, link, title, price});
        }
        return data;
    });
    // let json = result.json();
    // console.log(json);
    
    // await page.on('response', response => {
    //     if (result.data == true) {
    //         console.log('XHR response received'); 
    //         console.log(response.json()); 
    //     }
    // })
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
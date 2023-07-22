const pptr = require('puppeteer');
const fs = require('fs');
const url = 'https://www.cp24.com/world';

async function getNewsData(url) {
    try {
        const browser = await pptr.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(url);

        
        const section = await page.$$eval('li.dc.imageLeft > div.element.teaser', function (news) {
            return news.slice(0,5).map((n) => ({
                img: n.querySelector('div.teaserImage > a >img').getAttribute('src').trim(),
                description: n.querySelector('h2.teaserTitle > a').textContent
            }));
        });



        console.log(section);
        fs.writeFileSync('./server/data/newsImage.json', JSON.stringify(section));

        // await page.screenshot({ path: './server/data/screenshot.png' });
        await browser.close();
        console.log(`Web Scrape Complete`);
    } catch (e) {
        console.log(e.message)
    }

};

getNewsData(url); 
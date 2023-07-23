const pptr = require('puppeteer');
const fs = require('fs');
const url = 'https://news.google.com';

async function getGoogleData(url) {
    const browser = await pptr.launch({
        headless: false,
        defaultViewport: {
            width: 1920, height: 1080
        }
    })
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0');
    await page.goto(url);

    await page.focus('input.Ax4B8.ZAGvjd');
    await page.keyboard.type('Stock News');
    await page.keyboard.press('Enter');

    await page.waitForSelector('article'); 

    const section = await page.$$eval('article', function (news) {
        return news.map(function(n){
            return n.textContent; 
        });
      });
      

    console.log(section);

    // await page.screenshot({ path: './server/data/google.png' });
    await browser.close();
    console.log(`Web Scraping Completed!`);
};


getGoogleData(url); 
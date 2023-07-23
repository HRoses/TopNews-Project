const pptr = require('puppeteer');
const fs = require('fs');
const { get } = require('https');
const url = 'https://www.youtube.com/@freecodecamp';

async function getYoutubeData(url) {
    const browser = await pptr.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0');
    await page.goto(url);

    const section = await page.$$eval('div#items > ytd-grid-video-renderer', function (videos) {

        return videos.slice(0, 5).map((v) => ({
            img: v.querySelector('yt-image > img').getAttribute('src'),
            desciption: v.querySelector('div#meta >h3>a').textContent,
            url: 'https://youtube.com' + v.querySelector('div#meta >h3>a').getAttribute('href')
        }));
    })
    
    console.log(section)
    fs.writeFileSync('./server/data/youtubeData.json', JSON.stringify(section)); 
    
    // await page.screenshot({path: './server/data/youtube.png'}); 
    await browser.close();
}


getYoutubeData(url); 
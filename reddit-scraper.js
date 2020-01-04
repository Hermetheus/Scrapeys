const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.reddit.com/r/javascript/';

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    const description = [];
    $('h3').each(function() {
      newsHeadlines.push({
        title: $(this).text()
      });
      description.push({
        description: $(this).text()
      });
    });

    console.log(newsHeadlines);
    console.log(description);
  })
  .catch(console.error);

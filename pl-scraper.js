const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.espn.com/nfl/stats';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $('.Table__TBODY > tr');
    const topPassing = [];

    statsTable.each(function() {
      const playerRank = $(this)
        .find('.leaderCell__playerRank')
        .text();
      const playerName = $(this)
        .find('.Table__TD > div > a')
        .text();
      const passingYards = $(this)
        .find('td')
        .text();
      const team = $(this)
        .find('.leaderCell__teamAbbrev')
        .text();

      topPassing.push({
        rank: playerRank,
        name: playerName,
        passing: passingYards,
        team
      });
    });

    console.log(topPassing);
  })
  .catch(console.error);

var timeUtils = require('./utils/timeUtils');
var awsSonarMetricScraper = require('./awsSonarMetricScraper');

console.log(timeUtils.getTime() + '== starting AWS sonar scraping ===');
awsSonarMetricScraper.scrape();

## A web page scraper built with nodejs and osmosis to get sonar metrics

### tech stack
* **nodejs** - javascript runtime built on v8 engine
* **osmosis** - web scraper for nodejs
* **fast-csv** - csv parser for nodejs

### how to use
* git clone or download zip
* in the project directory, run `npm install`
* run `node` or `node sonarScraper`
* results are generated in the `/output` directory
* output file has the run date

### customize
* default export format is csv. Choose `textFileHelper` to export as text.
* project list:
    * it scrapes the sonar support server home page to get a list of projects
    * alternatively, you can provide a projectId list in `/input.sonarProjects.json`
    * in addition, it scrapes the awsci sonar home page to get a list of aws projects
    * the awsci project list can be directly changed in `sonarMetricScraper.scrapeProjects.done()`

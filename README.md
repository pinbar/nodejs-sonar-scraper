## A web page scraper built with nodejs and osmosis to get sonar metrics

### tech stack
* **nodejs** - javascript runtime built on v8 engine
* **osmosis** - web scraper for nodejs
* **fast-csv** - csv parser for nodejs

### prerequisites
* you should have node and npm already installed
* you should be connected to the MHE VPN to run this tool

### how to use
* git clone or download zip
* in the project directory, run `npm install`
* run `node sonarScraper.js`
* results are generated in the `/output` directory
* one output file per run date is generated

### customize
* default export format is csv. Choose `textFileHelper` to export as text.
* project list:
    * by default, the support server sonar home page is scraped to get a list of the projects
    * alternatively, you can provide a projectId list in `/input.sonarProjects.json`
    * in addition, the awsci sonar home page is also scraped to get a list of all aws projects but only the projects from `./input/sonarProjects.json` are included in generating the report

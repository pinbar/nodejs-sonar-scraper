## A web page scraper built with nodejs and osmosis to get sonar metrics

### tech stack
* **nodejs** - javascript runtime built on v8 engine
* **osmosis** - web scraper for nodejs
* **fast-csv** - csv parser for nodejs

### prerequisites
* node and npm are installed (`node -v` and `npm -v`)
* computer connected to the MHE VPN (to be able to access the support server and AWS CI)

### how to use
* git clone or download zip
* in the project directory, run `npm install`
* run `node index.js`
* results are generated in the `/output` directory as .csv files
* one output file per run date is generated (same day files are overwritten by the most recent run)

### customize
* Update the projectId list in `/input.sonar-projects.json`
    * supProjects are the projects in the datacenter support server
    * awsProjects are the projects in the AWS CI server
var osmosis = require('osmosis');
var timeUtils = require('./utils/timeUtils');
var fileUtils = require('./utils/fileUtils');
var sonarMetricScraper = require('./sonarMetricScraper');

var projectListUrl = 'http://sup-cv4.ced.emhe.mhc/sonar/all_projects';
var projectUrlPattern = '/sonar/dashboard/index/';
var supSonarExclusionList = fileUtils.getSupServerExclusionList('./input/sonarProjects.json');

var projectIds = []

function addProjectIdLToist(projectUrl){
    if(projectUrl.includes(projectUrlPattern)) {
        var projectId = projectUrl.substring(projectUrlPattern.length);
        if(supSonarExclusionList.indexOf(projectId) < 0) {
            projectIds.push(projectId);
        }
    }
}

function generateSonarReport() {
    osmosis
    .get(projectListUrl)
    .find(['#all-projects-table > tbody > tr > td > a@href'])
    .set('projectUrl')
    .data(function(results){
        addProjectIdLToist(results.projectUrl);
    })
    .error(function(err){
        console.log('****** error scraping:' + err);
    })
    .done(function(){
        console.log(timeUtils.getTime() + '** finished building projectIdList **');
        console.log("projectIds: " + projectIds);
        sonarMetricScraper.scrape(projectIds);
    });
}

console.log(timeUtils.getTime() + '** starting **');

//generate a report for a custom project list
// var supServerProjectIds = fileUtils.getSupServerProjectIds('./input/sonarProjects.json');
// sonarMetricScraper.scrape(supServerProjectIds);

//get all the projects from the sup server sonar home page and generate a report for all
generateSonarReport();
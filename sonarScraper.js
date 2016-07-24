var osmosis = require('osmosis');
var timeUtils = require('./utils/timeUtils');
var fileUtils = require('./utils/fileUtils');
var sonarMetricScraper = require('./sonarMetricScraper');

var projectListUrl = 'http://sup-cv2.ced.emhe.mhc/sonar/all_projects';
var projectUrlPattern = '/sonar/dashboard/index/';

var projectIds = []

function addProjectIdLToist(projectUrl){
	if(projectUrl.includes(projectUrlPattern)) {
		projectIds.push(projectUrl.substring(projectUrlPattern.length));
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
		sonarMetricScraper.scrape(projectIds);
	});
}

console.log(timeUtils.getTime() + '** starting **');

//this will get all the projects and generate a report for all
generateSonarReport();

//To generate a report for a custom project list
// var projectIds = fileUtils.getProjectIds('./input/sonarProjects.json');
// sonarMetricScraper.scrape(projectIds);
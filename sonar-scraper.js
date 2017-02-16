var osmosis = require('osmosis');
var timeUtils = require('./utils/timeUtils');
var fileUtils = require('./utils/fileUtils');

// var fileHelper = require('./txt/textFileHelper');
var fileHelper = require('./csv/csvFileHelper');
var awsApiBaseUrl = 'http://awsci.mheducation.com';
var supApiBaseUrl = 'http://sup-cv4.ced.emhe.mhc';

var counter = 0;

function scrapeProject(projectId, baseUrl) {
    
    var url = baseUrl + '/sonar/api/resources/index?resource=' + projectId + '&metrics=coverage%2Cit_coverage%2Cblocker_violations%2Ccritical_violations';

    osmosis
    .get(url)
    .then(function (context, results) {
        var coverage = context.get('key[text()="coverage"]');
        var itCoverage = context.get('key[text()="it_coverage"]');
        var blockerViolations = context.get('key[text()="blocker_violations"]');
        var criticalViolations = context.get('key[text()="critical-violations"]');

        results.projectId = context.get('id').textContent;
        results.project = context.get('name').textContent;

        results.utCoverage = coverage ? coverage.nextSibling.textContent : 0.00;
        results.itCoverage = itCoverage ? itCoverage.nextSibling.textContent : 0.00;  
        results.blockerViolations = blockerViolations ? blockerViolations.nextSibling.textContent : 0;
        results.criticalViolations = criticalViolations ? criticalViolations.nextSibling.textContent : 0;

        var data = fileHelper.collectData(results);
        fileHelper.appendToFile(data);
    })
    .error(function(err){
        console.log('** error scraping for ' + projectId + ':' + err);
    })
    .done(function(){
        counter = counter - 1;
        if(counter === 0) {
            console.log(timeUtils.getTime() + '== done with all projects. Finalizing file. ==');
            fileHelper.finalizeFile();
            console.log(timeUtils.getTime() + '== finished ==');
        }
    });
}

module.exports = {
    scrape: function scrape() {
        console.log(timeUtils.getTime() + '== starting ===');
        var awsProjects = fileUtils.getAWSServerProjectIds('./input/sonarProjects.json');
        var supProjects = fileUtils.getSupServerProjectIds('./input/sonarProjects.json');
        var totalProjects = awsProjects.length + supProjects.length;
        //set to the total number of projects
        osmosis.config('concurrency', totalProjects);
        counter = totalProjects;

        console.log(timeUtils.getTime() + '== starting aws sonar scraping ===');
        for (i = 0; i < awsProjects.length; i++) {
        
            scrapeProject(awsProjects[i], awsApiBaseUrl);
        }
        console.log(timeUtils.getTime() + '== done aws sonar scraping ===');
        
        console.log(timeUtils.getTime() + '== starting sup server sonar scraping ===');
        for (i = 0; i < supProjects.length; i++) {
            scrapeProject(supProjects[i], supApiBaseUrl);
        }
        console.log(timeUtils.getTime() + '== done sup server sonar scraping ===');
    }
}
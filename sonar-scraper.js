var osmosis = require('osmosis');

var timeUtils = require('./utils/time-utils');
var fileUtils = require('./utils/file-utils');
var fileHelper = require('./utils/csv-file-helper');

var awsApiBaseUrl = 'http://awsci.mheducation.com';
var supApiBaseUrl = 'http://sup-cv4.ced.emhe.mhc';

var counter = 0;

function scrapeProject(projectId, baseUrl) {
    
    var url = baseUrl + '/sonar/api/resources/index?resource=' + projectId + '&metrics=coverage%2Cit_coverage%2Cblocker_violations%2Ccritical_violations%2Cncloc';

    osmosis
    .get(url)
    .then(function (context, results) {
        var coverage = context.get('key[text()="coverage"]');
        var itCoverage = context.get('key[text()="it_coverage"]');
        var blockerViolations = context.get('key[text()="blocker_violations"]');
        var criticalViolations = context.get('key[text()="critical_violations"]');
        var linesOfCode = context.get('key[text()="ncloc"]');


        results.projectId = context.get('id').textContent;
        results.project = context.get('name').textContent;

        results.utCoverage = coverage ? coverage.nextSibling.textContent : 0.00;
        results.itCoverage = itCoverage ? itCoverage.nextSibling.textContent : 0.00;  
        results.blockerViolations = blockerViolations ? blockerViolations.nextSibling.textContent : 0;
        results.criticalViolations = criticalViolations ? criticalViolations.nextSibling.textContent : 0;
        results.linesOfCode = linesOfCode ? linesOfCode.nextSibling.textContent : 0;

        //when UT coverage doesnt exist, AWSCI Sonar shows IT coverage in the coverage section as well (or is it combined?)
        if(baseUrl === awsApiBaseUrl && results.utCoverage == results.itCoverage) {
            console.log(timeUtils.getTime() + '== setting AWS project id: ' + results.project +' - unit test coverage to 0 ==');
            results.utCoverage = 0.00;
        }

        var data = fileHelper.collectData(results);
        fileHelper.appendToFile(data);
    })
    .error(function(err){
        console.log('******** error scraping for ' + url + '********' + err);
    })
    .done(function(){
        counter = counter - 1;
        if(counter === 0) {
            console.log(timeUtils.getTime() + '== done with all projects ==');
            fileHelper.finalizeFile();
            console.log(timeUtils.getTime() + '== finished ==');
        }
    });
}

module.exports = {
    scrape: function scrape() {
        
        console.log(timeUtils.getTime() + '== starting ===');
        var awsProjects = fileUtils.getAWSServerProjectIds('./input/sonar-projects.json');
        var supProjects = fileUtils.getSupServerProjectIds('./input/sonar-projects.json');
        var totalProjectsCount = awsProjects.length + supProjects.length;
        
        osmosis.config('concurrency', totalProjectsCount);
        counter = totalProjectsCount;

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
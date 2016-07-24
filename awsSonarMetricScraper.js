var osmosis = require('osmosis');
var timeUtils = require('./utils/timeUtils');

// var fileHelper = require('./txt/textFileHelper');
var fileHelper = require('./csv/csvFileHelper');

//allow custom max gets
osmosis.config('concurrency', 5);

function scrapeProject(projectName) {

	var baseUrl = 'http://awsci.mheducation.com/sonar/'
	var measuresUTUrl = baseUrl + 'drilldown/measures?id=' + projectName +'&highlight=coverage';
	var measuresITUrl = baseUrl + 'drilldown/measures?id='+ projectName +'&highlight=it_coverage';
	var issueUrl = 'http://awsci.mheducation.com/sonar/api/resources/index?resource='+projectName+'&metrics=blocker_violations%2Ccritical_violations';

	osmosis
	.get(measuresUTUrl)
	.set({
		'project':'#bc > li > a',
	    'utCoverage':'#m_coverage'
	})
	.get(measuresITUrl)
	.set({
	    'itCoverage':'#m_it_coverage'
	})
	.get(issueUrl)
	.then(function (context, results) {
	    results.projectId = context.get('id').textContent;
	    results.project = (projectName==='rubric-ui'?'rubric-ui':'rubric-service');
	    results.blockerViolations = context.get('msr:first val:first').textContent; 	    
	    results.criticalViolations = context.get('msr:last val:last').textContent; 	    

		var data = fileHelper.collectData(results);
		fileHelper.appendToFile(data);
	})
	.error(function(err){
		console.log('** error scraping for ' + projectName + ':' + err);
	})
	.done(function(){
		console.log(timeUtils.getTime() + ' finalizing file');
		fileHelper.finalizeFile();
		console.log(timeUtils.getTime() + '== finished scraping ==');
	});
}

module.exports = {

	scrape: function scrape(projectNames) {

		for (i = 0; i < projectNames.length; i++) {
		    scrapeProject(projectNames[i]);
		}
	}
}
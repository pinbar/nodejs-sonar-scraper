var osmosis = require('osmosis');
var timeUtils = require('./utils/timeUtils');
var awsSonarMetricScraper = require('./awsSonarMetricScraper');

// var fileHelper = require('./txt/textFileHelper');
var fileHelper = require('./csv/csvFileHelper');

var exlusionProjectList = [5693,4450,15990,5868];

//allow custom max gets
osmosis.config('concurrency', 50);

function scrapeProject(projectId) {

	var baseUrl = 'http://sup-cv2.ced.emhe.mhc/sonar/drilldown/'
	var measuresUTUrl = baseUrl + 'measures/' + projectId + '?metric=coverage';
	var measuresITUrl = baseUrl + 'measures/' + projectId + '?metric=it_coverage';
	var issuessUrl = baseUrl + 'issues/' + projectId;

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
	.get(issuessUrl)
	.set({
	    'blockerViolations':'#m_blocker_violations',
	    'criticalViolations':'#m_critical_violations'
	})
	.data(function(results){
		results.projectId = projectId;
		var data = fileHelper.collectData(results);
		fileHelper.appendToFile(data);
	})
	.error(function(err){
		console.log('** error scraping for ' + projectId + ':' + err);
	})
	.done(function(){
		console.log(timeUtils.getTime() + ' done with sup-cv2 sonar');
		awsSonarMetricScraper.scrape(['rubric-ui', 'com.mheducation%3Arubric-services', 'com.mheducation%3Arubric-services%3Adevelop']);
	});
}

module.exports = {
	scrape: function scrape(projectIds) {
		console.log(timeUtils.getTime() + '== starting scraping ==');
		fileHelper.createFile('Sonar Results');

		for (i = 0; i < projectIds.length; i++) {
		    scrapeProject(projectIds[i]);
		}
	}
}
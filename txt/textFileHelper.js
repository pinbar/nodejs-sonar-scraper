var fs = require('fs');
var timeUtils = require('../utils/timeUtils');

module.exports = {
	collectData: function collectData(results){
	return "Project: " + results.project + "\n" 
			+ "Unit Test Coverage: " + results.utCoverage + "\n"
			+ "Integration Test Coverage: " + results.itCoverage + "\n"
			+ "Blocker Violations: " + results.blockerViolations + "\n" 
			+ "Critical Violations: " + results.criticalViolations + "\n"
			+ "--------------------------------------\n \n" ;
	},

	createFile: function createFile(data){
		fs.writeFileSync('./output/sonarResults.'+timeUtils.getDate()+'.txt', data + '\n==================\n\n');
	},

	appendToFile: function appendToFile(data){
		fs.appendFileSync('./output/sonarResults.'+timeUtils.getDate()+'.txt', data);
	},

	finalizeFile: function finalizeFile(){
		//do nothing
	}
};
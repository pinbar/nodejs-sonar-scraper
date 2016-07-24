var fs = require('fs');

module.exports = {

	getProjectIds: function getProjectIds(pathToFile){
		var sonarProjectJsonArray = JSON.parse(fs.readFileSync(pathToFile));
		var projectIds = [];
		for(i=0; i < sonarProjectJsonArray.length; i++) {
			projectIds.push(sonarProjectJsonArray[i].id);
		}
		return projectIds;
	}
};
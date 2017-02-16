var csv = require('fast-csv');
var timeUtils = require('../utils/time-utils');
var data = [];

module.exports = {
    collectData: function collectData(results){
        return {
                'Project Id': results.projectId, 
                'Project': results.project, 
                'Unit Test Coverage': results.utCoverage,
                'Integration Test Coverage': results.itCoverage,
                'Blocker Violations': results.blockerViolations,
                'Critical Violations': results.criticalViolations
            }
    },

    createFile: function createFile(data){
        //do nothing
    },

    appendToFile: function appendToFile(row){
        data.push(row);
    },

    finalizeFile: function finalizeFile(){
        csv.writeToPath("./output/sonarResults."+timeUtils.getDate()+".csv", data, {headers: true})
        .on("finish", function(){
        });
    }
};
var fs = require('fs');

module.exports = {

    getSupServerProjectIds: function getSupServerProjectIds(pathToFile){
        return JSON.parse(fs.readFileSync(pathToFile)).supProjects;
    },
    getAWSServerProjectIds: function getAWSServerProjectIds(pathToFile){
        return JSON.parse(fs.readFileSync(pathToFile)).awsProjects;
    }
};
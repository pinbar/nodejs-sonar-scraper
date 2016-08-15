var fs = require('fs');

module.exports = {

    getSupServerProjectIds: function getSupServerProjectIds(pathToFile){
        return JSON.parse(fs.readFileSync(pathToFile)).supProjects;
    },
    getSupServerExclusionList: function getSupServerExclusionList(pathToFile){
        return JSON.parse(fs.readFileSync(pathToFile)).supProjectsExclusionList;
    },
    getAWSServerProjectIds: function getAWSServerProjectIds(pathToFile){
        return JSON.parse(fs.readFileSync(pathToFile)).awsProjects;
    }
};
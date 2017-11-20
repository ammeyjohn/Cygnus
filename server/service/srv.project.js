const debug = require('debug')('cygnus:service:project');
const log = require('winston');
const Q = require('q');
const ProjectRepo = require('../repository/repo.project');

module.exports = class ProjectService {

    // Get all projects.
    // Default returns all actived projects.
    getAllProjects(actived = true) {
        var repo = new ProjectRepo();
        return repo.getAll(actived);
    }

    // Get project specified by project id.
    getProjectById(projectId) {
        var repo = new ProjectRepo();
        return repo.get(projectId);
    }

}
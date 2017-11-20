const debug = require('debug')('cygnus:repo:project');
const Mongo = require('../mongo.js');

const COLLECTION = 'projects';

module.exports = class ProjectRepo {

    // Get all projects.
    // Default returns all actived projects.
    getAll(actived) {
        let mongo = new Mongo();
        return mongo.query(COLLECTION, {
            actived: actived
        });
    }

    // Get project specified by project id.
    get(projectId) {
        let mongo = new Mongo();
        return mongo.query(COLLECTION, {
            id: projectId,
            actived: true
        }).then(ret => {
            return ret;
        });
    }

}
const debug = require('debug')('cygnus:api:project');
const _ = require('lodash');
const Q = require('q');
const mongo = require('../mongo.js');

const COLLECTION = 'projects';

// Select projects by condition.
// If condition is null or undefined, returns all projects.
exports.select = function(condition) {
    return mongo.query(COLLECTION, condition);
}
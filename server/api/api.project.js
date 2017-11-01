const debug = require('debug')('cygnus:api:project');
const _ = require('lodash');
const Q = require('q');
const mongo = require('../mongo.js');

const PROJECT = 'projects';

// Select projects by condition.
// If condition is null or undefined, returns all projects.
exports.getProjects = function (condition) {
    return mongo.query(PROJECT, condition);
}
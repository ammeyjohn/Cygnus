const debug = require('debug')('cygnus:api:workorder');
const _ = require('lodash');
const Q = require('q');
const mongo = require('../mongo.js');

const COLLECTION = 'work_orders';

// Select workorders by condition.
// If condition is null or undefined, returns all workorders.
exports.select = function(condition) {
    return mongo.query(COLLECTION, condition);
}

// Insert new workorder
exports.insert = function(workorder) {
    workorder.createTime = new Date();
    return mongo.insert(COLLECTION, workorder);
}
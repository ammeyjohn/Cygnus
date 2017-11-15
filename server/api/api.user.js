const debug = require('debug')('cygnus:api:user');
const _ = require('lodash');
const mongo = require('../mongo.js');

const COLLECTION = 'users';

// Select users by ids.
exports.selectByIds = function(idstr) {
    let cond = {};
    if (idstr) {
        let ids = _.split(idstr, ',');
        if (ids.length <= 1) {
            cond.id = parseInt(ids[0]);
        } else {
            cond.id = {
                $in: _.map(ids, Number)
            };
        }
    }
    return exports.select(cond);
}

// Select users by condition.
// If condition is null or undefined, returns all users.
exports.select = function(condition) {
    return mongo.query(COLLECTION, condition);
}
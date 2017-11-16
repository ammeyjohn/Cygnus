const debug = require('debug')('cygnus:api:dept');
const _ = require('lodash');
const mongo = require('../mongo.js');

const COLLECTION = 'departments';

// Select departments by condition.
// If condition is null or undefined, returns all departments.
const select = function(condition) {
    return mongo.query(COLLECTION, condition);
}

// Select departments by ids.
const selectByIds = function(idstr) {
    let cond = {};
    let ids = [];
    if (idstr) {
        ids = _.split(idstr, ',');
        if (ids.length == 1) {
            cond.id = parseInt(ids[0]);
        } else {
            cond.id = {
                $in: _.map(ids, Number)
            };
        }
    }
    return select(cond)
        .then(depts => {
            if (depts) {
                if (ids.length == 1) {
                    return depts[0];
                }
            }
            return depts;
        });
}

module.exports = {
    select: select,
    selectByIds: selectByIds
};
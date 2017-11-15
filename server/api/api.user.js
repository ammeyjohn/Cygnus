const debug = require('debug')('cygnus:api:user');
const _ = require('lodash');
const mongo = require('../mongo.js');

const COLLECTION = 'users';

// Select users by condition.
// If condition is null or undefined, returns all users.
const select = function (condition) {
    return mongo.query(COLLECTION, condition);
}

// Select users by ids.
const selectByIds = function (idstr) {
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
        .then(users => {
            if (users) {
                if (ids.length == 1) {
                    return users[0];
                }
            }
            return users;
        });
}

exports['select'] = select;
exports['selectByIds'] = selectByIds;
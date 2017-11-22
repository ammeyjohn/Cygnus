const debug = require('debug')('cygnus:repo:user');
const _ = require('lodash');
const Mongo = require('../mongo.js');

const COLLECTION = 'users';

// Generate a condition object from given parameters.
const getCondition = function(params, fuzzy, or) {
    let cond = {};
    if (params.name) cond['name'] = fuzzy ? new RegExp(params.name) : params.name;
    if (params.userName) cond['userName'] = fuzzy ? new RegExp(params.userName) : params.userName;
    if (params.email) cond['email'] = fuzzy ? new RegExp(params.email) : params.email;
    if (or) {
        let orCond = [];
        for (let name in cond)
            orCond.push(_.pick(cond, name));
        return { '$or': orCond };
    }
    return cond;
}

module.exports = class UserRepo {

    // Add an user to db.
    add(user) {
        let mongo = new Mongo();
        return mongo.getNextSeq('user_id')
            .then(ret => {
                user.id = ret.seq;
                return mongo.insert(COLLECTION, user);
            });
    }

    // Get ap specified user by given userid.
    getById(userId) {
        let mongo = new Mongo();
        return mongo.query(COLLECTION, {
            id: userId
        }).then(ret => {
            if (ret && ret.length >= 1) {
                return ret[0];
            }
            return null;
        });
    }

    // Get a specified user by given condition.
    // Null argument will be ignored.
    get(condition, fuzzy = false) {
        let cond = getCondition(condition, fuzzy, false);
        let mongo = new Mongo();
        return mongo.query(COLLECTION, cond)
            .then(ret => {
                if (ret && ret.length >= 1) {
                    return ret[0];
                }
                return null;
            });
    }

    // Query users by given condition.
    query(condition, fuzzy = true) {
        let cond = getCondition(condition, fuzzy, true);
        let mongo = new Mongo();
        return mongo.query(COLLECTION, cond);
    }

}
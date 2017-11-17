const debug = require('debug')('cygnus:repo:user');
const Mongo = require('../mongo.js');

const COLLECTION = 'users';

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

    // Get a specified user by given condition.
    // Null argument will be ignored.
    get(userId, userName, mail) {
        var cond = {};
        if (userId) cond.id = userId;
        if (userName) cond.userName = userName;
        if (mail) cond.email = mail;

        let mongo = new Mongo();
        return mongo.query(COLLECTION, cond);
    }

}
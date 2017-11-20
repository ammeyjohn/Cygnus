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
    get(name, userName, mail, fuzzy = false) {
        var cond = {};
        if (name)
            cond.name = fuzzy ? new RegExp(name) : name;
        if (userName)
            cond.userName = fuzzy ? new RegExp(userName) : userName;
        if (mail)
            cond.email = fuzzy ? new RegExp(mail) : mail;

        let mongo = new Mongo();
        return mongo.query(COLLECTION, cond);
    }

}
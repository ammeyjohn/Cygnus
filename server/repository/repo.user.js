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

}
const debug = require('debug')('cygnus:service:user');
const log = require('winston');
const Q = require('q');
const UserRepo = require('../repository/repo.user');

module.exports = class UserService {

    // Add an user instance.
    addUser(user) {
        if (!user) {
            throw new Error('Null argument "user"');
        }

        let repo = new UserRepo();
        return repo.add(user);
    }

    // Get a user instance by given user id.
    getUserById(userId) {
        if (!userId) {
            throw new Error('Null argument "userId"');
        }

        let repo = new UserRepo();
        return repo.get(userId);
    }

    // Get a user instance by given condition.
    getUser(condition, fuzzy) {
        let repo = new UserRepo();
        return repo.get(condition, fuzzy);
    }

    // Query users by given condition.
    queryUser(condition, fuzzy) {
        let repo = new UserRepo();
        return repo.query(condition, fuzzy);
    }
}
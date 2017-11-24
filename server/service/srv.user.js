const debug = require('debug')('cygnus:service:user');
const log = require('winston');
const Q = require('q');
const UserRepo = require('../repository/repo.user');

module.exports = class UserService {

    constructor() {
        this.repo = new UserRepo();
    }

    getUserById(userId) {
        if (!userId) {
            throw new Error('Null argument "userId"');
        }
        return this.repo.getUserById(userId);
    }

    getUser(condition) {
        return this.repo.getUserByCondition(condition);
    }

    queryUser(condition) {
        return this.repo.queryUsersByCondition(condition);
    }

    addUser(user) {
        if (!user) {
            throw new Error('Null argument "user"');
        }

        return this.repo.addUser(user);
    }

    // // Get a user instance by given user id.
    // getUserById(userId) {
    //     if (!userId) {
    //         throw new Error('Null argument "userId"');
    //     }

    //     let repo = new UserRepo();
    //     return repo.get(userId);
    // }



    // // Query users by given condition.
    // queryUser(condition, fuzzy) {
    //     let repo = new UserRepo();
    //     return repo.query(condition, fuzzy);
    // }
}
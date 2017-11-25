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
        return this.repo.selectById(userId);
    }

    getUsers(condition, params) {
        return this.repo.select(condition, params);
    }

    addUser(user) {
        if (!user) {
            throw new Error('Null argument "user"');
        }

        return this.repo.add(user);
    }
}
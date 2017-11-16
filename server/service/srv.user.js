const debug = require('debug')('cygnus:service:user');
const log = require('winston');
const Q = require('q');
const UserRepo = require('../repository/repo.user');

module.exports = class UserService {

    // Add an user instance.
    addUser(user) {
        let repo = new UserRepo();
        return repo.add(user);
    }

}
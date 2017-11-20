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
    // getUserById(userId) {
    //     if (!userId) {
    //         throw new Error('Null argument "userId"');
    //     }

    //     let repo = new UserRepo();
    //     return repo.get(userId);
    // }

    // Get a user instance by given condition.
    getUser(name, userName, mail, fuzzy = false) {
        let repo = new UserRepo();
        return repo.get(name, userName, mail, fuzzy)
            .then(ret => {
                if (ret && ret.length > 0) {
                    return ret[0];
                }
                return null; 
            });
    }

    // Get a user instance by given username.
    getUserByUserName(userName, fuzzy = false) {
        if (!userName) {
            throw new Error('Null argument "userName"');
        }

        let repo = new UserRepo();
        return repo.get(userName, null, fuzzy);
    }

    // Get a user instance by given mail address.
    getUserByMail(mail, fuzzy = false) {
        if (!mail) {
            throw new Error('Null argument "mail"');
        }

        let repo = new UserRepo();
        return repo.get(null, mail, fuzzy)
            .then(ret => {
                if (ret.length > 0) {
                    return ret[0];
                }
                return null;
            });
    }
}
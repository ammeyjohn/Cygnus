const debug = require('debug')('cygnus:service:authorize');
const log = require('winston');
const Q = require('q');
const ldap = require('ldapjs');
const settings = require('../settings');
const UserService = require('./srv.user');

const CODE_AUTH_LOGIN_ERROR = -11;
const CODE_AUTH_LDAP_SEARCH_ERROR = -12;

// User login from ldap
const ldap_login = (userName, password) => {

    let defered = Q.defer();

    // Use email to login from ldap.
    let dn = userName;
    if (dn.indexOf('@') == -1) {
        dn = userName + '@shanghai3h.com';
    }

    let client = ldap.createClient({
        url: settings.ldap.url
    });

    // Try login ldap by email and password. 
    client.bind(dn, password, (err) => {
        if (err) {
            defered.reject({
                code: CODE_AUTH_LOGIN_ERROR,
                success: false,
                message: 'Invalid user name or wrong password',
                error: err
            });
            return;
        }

        var userSrv = new UserService();
        userSrv.getUserByMail(dn)
            .then(ret => {

                let credential = {
                    user: null,
                    success: true,
                    loginTime: new Date()
                }

                if (ret) {
                    // User has been existed in mongodb.
                    credential.user = ret;
                    defered.resolve(credential);
                    client.unbind();
                    return;
                }

                let opts = {
                    filter: '(mail=' + dn + ')',
                    scope: 'sub'
                };

                client.search(settings.ldap.baseDN, opts, function(err, res) {
                    if (err) {
                        defered.reject({
                            code: CODE_AUTH_LOGIN_ERROR,
                            success: false,
                            message: 'Search user info from ldap error.',
                            error: err
                        });
                        return;
                    }

                    res.on('searchEntry', function(entry) {
                        let obj = entry.object;
                        let user = {
                            name: obj.name,
                            department: obj.department,
                            email: obj.mail,
                            userName: obj.sAMAccountName,
                            mobile: obj.mobile,
                            title: obj.title,
                            source: 'LDAP',
                            createTime: new Date()
                        }

                        userSrv.addUser(user)
                            .then(ret => {
                                credential.user = ret;
                                defered.resolve(credential);
                            });
                    });

                    res.on('error', (err) => {
                        client.unbind();
                        defered.reject({
                            code: CODE_AUTH_LDAP_SEARCH_ERROR,
                            success: false,
                            message: 'Search user info from LDAP error.',
                            error: err
                        });
                    });

                    res.on('end', (result) => {
                        client.unbind();
                    });
                });

            });
    });

    return defered.promise;
}

module.exports = class Authorize {

    // User login with username and password.
    login(userName, password) {
        return ldap_login(userName, password)
            .then((credential) => {
                return credential;
            })
            .fail((err) => {
                log.error(err);
                throw err;
            });
    }

}
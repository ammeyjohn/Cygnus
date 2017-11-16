const debug = require('debug')('cygnus:mongo');
const util = require('util');
const Q = require('q');
const mongo = require('mongodb').MongoClient;
const log = require('winston');
const url = require('./settings.js').db.addr;

const CODE_DB_CONNECT_ERROR = -1;
const MSG__DB_CONNECT_ERROR = 'Failed to connect to server $s';
const MSG__DB_CONNECT_EX = 'Exception occured when connect to server $s';
const MSG__DB_CONNECT_SUCCESS = 'Connected to server $s';

const CODE_DB_EXECUTE_ERROR = -2;
const MSG__DB_EXECUTE_ERROR = 'Failed to execute %s operation on server $s, collection %s';
const MSG__DB_EXECUTE_EX = 'Exception occured when execute %s on server $s, collection %s';
const MSG__DB_EXECUTE_SUCCESS = 'Execute %s operation on server $s, collection %s';

const onError = function (code, msg, err, params, defered) {
    let ex = {
        code: code,
        message: msg,
        error: err,
        payload: params
    }
    if (defered)
        defered.reject(ex);
    log.error(ex);
    return ex;
}

const connect = function () {
    let defered = Q.defer();
    try {
        mongo.connect(url, function (err, db) {
            if (err) {
                return onError(CODE_DB_CONNECT_ERROR,
                    util.format(MSG__DB_CONNECT_ERROR, url),
                    err,
                    url,
                    defered);
            }

            log.debug(util.format(MSG__DB_CONNECT_SUCCESS, url));
            defered.resolve(db);
        });
    } catch (err) {
        onError(CODE_DB_CONNECT_ERROR,
            util.format(MSG__DB_CONNECT_EX, url),
            err,
            url,
            defered);
    }
    return defered.promise;
}

module.exports = class Mongo {

    // Query from mongodb.
    query(collection, condition) {
        return connect().then(function (db) {
            var defered = Q.defer();
            try {
                var c = db.collection(collection);
                c.find(condition).toArray(function (err, docs) {
                    if (err) {
                        return onError(CODE_DB_EXECUTE_ERROR,
                            util.format(MSG__DB_EXECUTE_ERROR, 'query', url, collection),
                            err,
                            condition,
                            defered);
                    }

                    log.debug(util.format(MSG__DB_EXECUTE_SUCCESS, 'query', url, collection));
                    log.debug(condition);
                    defered.resolve(docs);
                });
            } catch (err) {
                onError(CODE_DB_CONNECT_ERROR,
                    util.format(MSG__DB_EXECUTE_EX, 'query', url, collection),
                    err,
                    condition,
                    defered);
            }
            return defered.promise;
        });
    }

    // Insert item to mongodb.
    insert(collection, item) {
        return connect().then(function (db) {
            var defered = Q.defer();
            try {
                var c = db.collection(collection);
                c.insert(item, function (err, docs) {
                    if (err) {
                        return onError(CODE_DB_EXECUTE_ERROR,
                            util.format(MSG__DB_EXECUTE_ERROR, 'insert', url, collection),
                            err,
                            item,
                            defered);
                    }

                    let ret = null;
                    if (docs.result.ok === 1) {

                        log.debug(util.format(MSG__DB_EXECUTE_SUCCESS, 'insert', url, collection));
                        log.debug(item);

                        ret = docs.ops[0];
                    }
                    defered.resolve(ret);
                });
            } catch (error) {
                onError(CODE_DB_CONNECT_ERROR,
                    util.format(MSG__DB_EXECUTE_EX, 'insert', url, collection),
                    err,
                    item,
                    defered);
            }
            return defered.promise;
        });
    }

}
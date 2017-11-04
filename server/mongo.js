const debug = require('debug')('cygnus:mongo');
const Q = require('q');
const mongo = require('mongodb').MongoClient;
const log = require('winston');
const settings = require('./settings.js');

const helper = {};

const connect = function () {
    let defered = Q.defer();
    try {
        mongo.connect(settings.DB_ADDR, function (err, db) {
            debug('Connected correctly to server ' + settings.DB_ADDR);
            if (!err) {
                defered.resolve(db);
            } else {
                defered.reject(err);
            }
        });
    } catch (err) {
        log.error(err);
        defered.reject(err);
    }
    return defered.promise;
}

helper.query = function (collection, condition) {
    return connect().then(function (db) {
        var defered = Q.defer();
        try {
            var c = db.collection(collection);
            c.find(condition).toArray(function (err, docs) {
                debug(docs);
                if (!err) {
                    defered.resolve(docs);
                } else {
                    defered.reject(err);
                }
            });
        } catch (err) {
            log.error(err);
            defered.reject(err);
        }
        return defered.promise;
    });
}

helper.insert = function (collection, item) {
    return connect().then(function (db) {
        var defered = Q.defer();
        try {
            var c = db.collection(collection);
            c.insert(item, function (err, docs) {
                debug(docs);
                if (!err) {
                    if (docs.result.ok === 1) {
                        defered.resolve(docs.ops[0]);
                    } else {
                        defered.reject(null);
                    }
                } else {
                    defered.reject(err);
                }
            });
        } catch (error) {
            log.error(err);
            defered.reject(err);
        }
        return defered.promise;
    });
}

module.exports = helper;
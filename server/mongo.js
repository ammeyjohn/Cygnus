const debug = require('debug')('cygnus:mongo');
const Q = require('q');
const mongo = require('mongodb').MongoClient;
const settings = require('./settings.js');

const helper = {};

const connect = function() {
    let defered = Q.defer();
    try {
        mongo.connect(settings.DB_ADDR, function(err, db) {
            debug('Connected correctly to server ' + settings.DB_ADDR);
            if (!err) {
                defered.resolve(db);
            } else {
                defered.reject(err);
            }
        });
    } catch (err) {
        debug(err);
        defered.reject(err);
    }
    return defered.promise;
}

helper.query = function(collection, condition) {
    return connect().then(function(db) {
        var defered = Q.defer();
        var c = db.collection(collection);
        c.find(condition).toArray(function(err, docs) {
            debug(docs);
            if (!err) {
                defered.resolve(docs);
            } else {
                defered.reject(err);
            }
        });
        return defered.promise;
    });
}

module.exports = helper;
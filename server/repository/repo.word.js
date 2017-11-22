const debug = require('debug')('cygnus:repo:word');
const Mongo = require('../mongo.js');

const COLLECTION = 'words';

module.exports = class WordRepo {

    // Get a word object by code.
    getByCode(code) {
        let mongo = new Mongo();
        return mongo.query(COLLECTION, {
            'code': code
        }).then(ret => {
            if (ret && ret.length >= 1) {
                return ret[0];
            }
            return null;
        });
    }

}
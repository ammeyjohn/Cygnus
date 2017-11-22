const debug = require('debug')('cygnus:service:word');
const log = require('winston');
const Q = require('q');
const WordRepo = require('../repository/repo.word');

module.exports = class WordService {

    // Get word object by code.
    getByCode(code) {
        if (!code) {
            throw new Error('Null argument "code"');
        }

        let repo = new WordRepo();
        return repo.getByCode(code);
    }

}
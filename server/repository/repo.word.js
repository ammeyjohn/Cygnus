const debug = require('debug')('cygnus:repo:word');
const setting = require('../settings');
const mongoose = require('mongoose');
const Word = require('../model/word');

const COLLECTION = 'words';

module.exports = class WordRepo {

    // Get a word object by code.
    getByCode(code) {
        return Word.findOne({ code: code }).lean();
    }

}
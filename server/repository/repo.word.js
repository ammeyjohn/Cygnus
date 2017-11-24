const Word = require('../model/word');

module.exports = class WordRepo {

    // Get a word object by code.
    getByCode(code) {
        return Word.findOne({ code: code }).lean();
    }

}
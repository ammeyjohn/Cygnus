const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    id: Number,
    code: String,
    name: String,
    items: [{
        code: String,
        name: String
    }]
});

module.exports = mongoose.model('Word', wordSchema);
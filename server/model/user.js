const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    department: String,
    email: String,
    userName: String,
    mobile: String,
    title: String,
    source: String,
    createTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
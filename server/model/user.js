const mongoose = require('mongoose');
const Sequence = require('./sequence');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    department: String,
    email: String,
    userName: String,
    mobile: String,
    title: String,
    source: String,
    createTime: { type: Date, default: Date.now }
}, {
    versionKey: false
});

userSchema.pre('save', function(next) {
    var __that = this;
    Sequence.getNextId('user_id', 'id')
        .then(ret => {
            __that.id = ret.seq;
            next();
        });
});

module.exports = mongoose.model('User', userSchema, 'users');
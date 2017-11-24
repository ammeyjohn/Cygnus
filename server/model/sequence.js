const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seqSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
}, {
    versionKey: false
});

const Sequence = mongoose.model('Sequence', seqSchema, 'sequence');

module.exports = {

    getNextId(id) {
        return Sequence.findByIdAndUpdate({ _id: id }, { $inc: { seq: 1 } }, { new: true, upsert: true });
    }

}
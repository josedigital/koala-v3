const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const Note = new Schema({

    category: {type: String, required: true },
    noteText: {type: String, required: true }

});
// This was the Mongoose Middlware "Hook", couldn't get it to work so I just wrote it myself - like a boss.
// Note.post('remove', function(next) {
//     Job.remove({ Notes: this._id }).exec();
//     next();
// });

Note.plugin(uniqueValidator);

module.exports = mongoose.model('Note', Note);

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const Job = new Schema({
    title: {type:String, required:true},
    url: String,
    summary: String,
    location: String,
    isHot: Boolean,
    status: String,
    company: String,
    Notes:[{
        type: mongoose.Schema.ObjectId, 
        default: mongoose.Types.ObjectId,
        ref: 'Note'
        }]        
});

Job.plugin(uniqueValidator);

module.exports = mongoose.model('Job', Job);

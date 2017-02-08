const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const User= new mongoose.Schema({

 username: {
    type:String,
    required:true
  },
 email: {
    type:String,
    unique: true,
    required:true
  },
  id: String,
  token: String,
 
 Jobs:[{
        _id: {
            type: mongoose.Schema.ObjectId,
            default: mongoose.Types.ObjectId
        },
        title: {
            type:String,
            // unique: true, NO because jobs COULD be named the same
            required:true
        },
        url: String,
        summary: String,
        location: String,
        isHot: Boolean,
        status: String,
        company: String,
        Notes:[
            {
                category: {
                    type: String,
                    required: true // must have a category
                },
                _id: {
                    type: mongoose.Schema.ObjectId,
                    default: mongoose.Types.ObjectId
                },
                noteText: {
                    type: String,
                    required: true
                }
           }
        ]        
    }]

});

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);

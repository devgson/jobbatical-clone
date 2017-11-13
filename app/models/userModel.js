'use strict';


// load dependencies
const mongoose = require('mongoose'),
    //jobSchema = require('./jobSchema'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

/**
 * schema that represents typical user information
 * to be collected on the 'signup' page and saved to the DB
 */
let userSchema = new Schema ({
    companyName: {
      type : String,
      required : [true, 'Company Name cannot be blank'],
      unique : true
    },
    email: {
      type : String,
      required : [true, 'Email cannot be empty'],
      unique : true,
      trim : true
    },
    jobs : [{
      type : Schema.Types.ObjectId,
      ref : 'job'
    }],
    password: {
      type : String,
      required : [true, 'Password cannot be blank']
    }
});

let User = mongoose.model('user', userSchema);

module.exports = User;
/**
 * schema that represents typical job information
 * to be collected on the 'job-form' page and saved to the DB
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let jobSchema = new Schema({
    jobTitle: {
      type: String,
      required : true
    },
    location: {
      type: String,
      required : true
    },
    companyName : {
      type : String,
      required : true
    },
    salary: {
      type: Number,
      required : true
    },
    date: {
      type: Date,
      validate : {
        validator : function(date){
          var dates = new Date(date);
          return dates > Date.now();
        },
        message : 'Date cannot be less than today'
      },
      required : true
    },
    companyDescription: {
      type: String,
      required : true
    },
    jobDescription: {
      type: String,
      required : true
    },
    responsibilities: {
      type: String,
      required : true
    },
    requirements: {
      type: String,
      required : true
    }
});

var Job = mongoose.model('job',jobSchema);

module.exports = Job;
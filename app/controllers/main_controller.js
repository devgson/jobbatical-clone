'use strict';
var mongoose = require('mongoose');
var User = require('../models/userModel');
var Job = require('../models/jobModel');

exports.home = async function(req, res, next){
  try {
    var job = await Job.find({}).count();
    var company = await User.find({}).count();
    res.render('home', { job : job , company : company });
  } catch (error) {
    return next(error);
  }
}

exports.login = function(req, res, next){
  res.render('login');
}

exports.signup = function(req, res, next){
  res.render('signup');
}

exports.explore = async function(req, res, next){
  try {
    var job = await Job.find({});
    var options = { month : 'short', year : 'numeric', day : 'numeric' };
    res.render('explore', { job : job, options : options }); 
  } catch (error) {
    return next(error);
  }
}

exports.jobForm = async function(req, res, next){
  let { user } = req.session;
  try {
    let use = await User.findById(user);
    res.render('job-form', { name : use.companyName });
  } catch (error) {
    return next(error); 
  }
}

exports.signedup = async function(req, res, next){
  let { name, email, password, confirmPassword } = req.body;
  let obj = { companyName : name, email : email, password : password };
  if (password !== confirmPassword){
    var err = new Error('Passwords do not match');
    err.status = 401;
    return next(error);
  }
  try {
    let user = await new User(obj);
    let use = await user.save();
    req.session.user = use._id;
    res.redirect('/');
  } catch (error) {
    return next(error);
  }
}

exports.loggedin = async function(req, res, next){
  let { email, password } = req.body;
  try {
    var user = await User.findOne({ email : email, password : password});
    req.session.user = user._id;
    res.redirect('/job-posts');
  } catch (error) {
    return next(error);
  }
}

exports.signout = async function(req, res, next){
  try {
    if(req.session){
      await req.session.destroy();
      res.redirect('/');
    }else{
      res.redirect('/');
    }
  } catch (error) {
    return next(error);
  }
}

exports.jobposts = async function(req, res, next){
  var id = req.session.user;
  try {
    var user = await User.findById(id).populate('jobs');
    var options = { month : 'long', weekday :'long', year : 'numeric', hour12 : false, day : 'numeric' };
    res.render('job-posts', { users : user.jobs , options : options });
  } catch (error) {
    return next(error);    
  }
}

exports.checkSession = async function(req, res, next){
  if(!req.session.user){
    var err = new Error('You must be Logged In to view this page'); 
    err.status = 401;
    return next(err);
  }else{
    return next();
  }
}

exports.redirect = async function(req, res, next){
  if(req.session.user){
    res.redirect('/');
  }else{
    return next();
  }
}

exports.jobformsubmit = async function(req, res, next){
  let { jobTitle, date, companyName, location, salary, companyDescription, jobDescription, responsibilities, requirements } = req.body;
  let obj = {
    jobTitle : jobTitle,
    location : location,
    salary : salary,
    date : date,
    companyName : companyName,
    companyDescription : companyDescription,
    jobDescription : jobDescription,
    responsibilities : responsibilities,
    requirements : requirements,
  }
  try {
    var job = new Job(obj);
    var user = await User.findById(req.session.user);
    console.log(req.session);
    console.log(user);
    user.jobs.push(job);
    await user.save();
    await job.save();
    res.redirect('/job-posts');
  } catch (error) {
    console.log('here');
    return next(error);
  }
}

exports.jobdetails = async function(req, res, next){
  try {
    var query = req.query.id;
    var job = await Job.findById(query);
    res.render('job-details', { job : job });
  } catch (error) {
    return next(error);
  }
}

exports.delete = async function(req, res, next){
  try {
    var id = req.query.id;
    var job = await Job.findByIdAndRemove(id);
    res.redirect('/job-posts');
  } catch (error) {
    return next(error);
  }
}

exports.edit = async function(req, res, next){
  try {
    var id = req.query.id;
    var job = await Job.findById(id);
    res.render('job-edit', { job : job});
  } catch (error) {
    return next(error);
  }
}

exports.editformsubmit = async function(req, res, next){
  try {
    let id = req.body.id;
    let { jobTitle, date, companyName, location, salary, companyDescription, jobDescription, responsibilities, requirements } = req.body;
    let obj = {
      jobTitle : jobTitle,
      location : location,
      salary : salary,
      date : date,
      companyName : companyName,
      companyDescription : companyDescription,
      jobDescription : jobDescription,
      responsibilities : responsibilities,
      requirements : requirements,
    };
    var job = await Job.findByIdAndUpdate(id, obj);
    res.redirect('/job-posts');
  } catch (error) {
    return next(error);
  }
}
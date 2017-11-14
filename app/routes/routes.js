var express = require('express');
var router = express.Router();
var paths = require('../controllers/main_controller');

router.get('/', paths.home);

router.get('/login', paths.redirect, paths.login);

router.get('/signup', paths.redirect, paths.signup);

router.get('/explore', paths.explore);

router.get('/job-form', paths.checkSession, paths.jobForm);

router.get('/signout', paths.signout);

router.get('/job-posts', paths.checkSession, paths.jobposts);

router.get('/job-details', paths.jobdetails);

router.get('/delete', paths.delete);

router.get('/edit', paths.edit);

router.post('/edit', paths.editformsubmit);

router.post('/signup', paths.signedup);

router.post('/login', paths.loggedin);

router.post('/job-form', paths.checkSession, paths.jobformsubmit);

module.exports = router;
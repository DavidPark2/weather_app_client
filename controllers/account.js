var express = require('express');
var controller = express.Router();
var accountRequest = require('../public/javascripts/request');

controller.get('/', function(req, res, next) {

	res.render('account');
})

controller.post('/login', function(req, res, next) {
	var login = {email: req.body.email,
				 password: req.body.password
				};
	// http request with the login variable
	var requestedLogin = accountRequest.login(login);

	// if successful, create sessions
	if (requestedLogin.success === true) {
		req.session.email = requestedLogin.searchHistory[0].email
		req.session.account = requestedLogin;
		console.log('----------------------req.session')
		console.log(req.session.email);
		res.redirect('/weather');
	} else {
		res.redirect('/accounts');
	}
})

controller.post('/signup', function(req, res, next) {
	var signup = {username: req.body.username,
				  email: req.body.email,
				  password: req.body.password
				 };
	 // http request with signup variable
	var requestedSignup = accountRequest.signup(signup);
	// if successful, create sessions
	if (requestedSignup.success === true) {
		req.session.email = requestedSignup.searchHistory[0].email
		req.session.account = requestedSignup;
		console.log('----------------------req.session')
		console.log(req.session.account);
		res.redirect('/weather');
	} else {
		res.redirect('/accounts');
	}
})

module.exports = controller;
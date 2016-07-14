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
	console.log(login);
	console.log('^-------------login')
	var requestedLogin = accountRequest.login(login);

	console.log(requestedLogin);
	console.log('^----------------requestLogin')
	// if successful, create sessions
	if (requestedLogin.success === true) {
		console.log('right before sessions')
		req.session.email = requestedLogin.searchHistory[0].email
		req.session.account = requestedLogin;
		console.log('below----------------------req.session.account')
		console.log(req.session.account)
		console.log('below----------------------req.session.email')
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
	 console.log(signup);
	console.log('^-------------signup')
	var requestedSignup = accountRequest.signup(signup);
	console.log(requestedSignup);
	console.log('^----------------requestedSignup')
	// if successful, create sessions
	if (requestedSignup.success === true) {
		console.log('right before sessions')
		req.session.email = requestedSignup.searchHistory[0].email
		req.session.account = requestedSignup;
		console.log('below----------------------req.session.account')
		console.log(req.session.account)
		console.log('below----------------------req.session.email')
		console.log(req.session.email);
		res.redirect('/weather');
	} else {
		res.redirect('/accounts');
	}
})

module.exports = controller;
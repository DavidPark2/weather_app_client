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

	var requestedLogin = accountRequest.login(login);
	console.log('------------------------requestedLogin')
	console.log(requestedLogin);
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

	var requestedSignup = accountRequest.signup(signup);
	console.log('------------------------requestSignup')
	console.log(requestedSignup);
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
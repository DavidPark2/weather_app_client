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

	console.log('---------------------start login req');
	console.log(login);
	console.log('---------------------end login req');
	var requestedLogin = accountRequest.login(login);
	console.log('---------------------start requestedLogin');
	console.log(requestedLogin);
	console.log('---------------------end requestedLogin');

})

controller.post('/signup', function(req, res, next) {
	var signup = {username: req.body.username,
				  email: req.body.email,
				  password: req.body.password
				 };

 	console.log('---------------------start signup req');
	console.log(signup);
	console.log('---------------------end signup req');

	var requestedSignup = accountRequest.signup(signup);
	console.log('---------------------start requestedSignup');
	console.log(requestedSignup);
	console.log('---------------------end requestedSignup');
})

module.exports = controller;
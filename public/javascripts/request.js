var request = require('request');
var deasync = require('deasync');

module.exports.weatherInput = function(inputLocation, inputAccount) {
	var location;
	request.post({
		url: 'http://localhost:3000/weather/search',
		form: {inputLocation: inputLocation,
			   inputAccount: inputAccount
		}
	},
		function (err, res, body) {
			location = body;
		}
	)
	while(location === undefined) {
		deasync.runLoopOnce();
	}
	return JSON.parse(location);
}

module.exports.login = function(input) {
	var location;
	request.post({
		url: 'http://localhost:3000/users/login',
		form: input
	},
		function (err, res, body) {
			location = body;
		}
	)
	while(location === undefined) {
		deasync.runLoopOnce();
	}
	return JSON.parse(location);
}

module.exports.signup = function(input) {
	var location;
	request.post({
		url: 'http://localhost:3000/users/signup',
		form: input
	},
		function (err, res, body) {
			location = body;
		}
	)
	while(location === undefined) {
		deasync.runLoopOnce();
	}
	return JSON.parse(location);
}

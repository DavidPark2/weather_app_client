var request = require('request');
var deasync = require('deasync');

module.exports.weatherInput = function(input) {
	var location;
	request.post({
		url: 'http://localhost:3000/weather/search',
		form: {location: input}
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

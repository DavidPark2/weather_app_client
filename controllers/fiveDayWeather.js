var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res, next) {
	// Need to change location
  res.render('five-days', {location: 'Chicago, IL',
  						day: 'Monday',
  						high: 90, low: 60,
  						summary: 'rain',
  						rain: 70,
  						humidity: 90,
  						rise: '6:22', set: '8:23'
  });
})

module.exports = controller;
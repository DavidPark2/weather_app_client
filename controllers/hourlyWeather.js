var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res, next) {
	// Need to change location
  res.render('hourly', {location: 'Chicago, IL',
  						time: 1,
  						temp: 60,
  						summary: 'rain',
  						rain: 70,
  						humidity: 90
  });
})

module.exports = controller;
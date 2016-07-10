var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res, next) {
	// Need to change location
  res.render('yearly', {location: 'Chicago, IL',
  						date: '7/4/16',
  						high: 90, low: 60,
  						fhigh: 90, flow: 60,
  						summary: 'rain',
  						wind: 70
  });
})

module.exports = controller;
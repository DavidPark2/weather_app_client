var express = require('express');
var controller = express.Router();
var weatherRequest = require('../public/javascripts/request');

/* GET home page. */
controller.get('/', function(req, res, next) {
	// Need to change location
  res.render('weather');
})

controller.post('/input', function(req, res, next) {
	var input = req.body.area;

	var requestedWeather = weatherRequest.weatherInput(input);
	req.session.weather = requestedWeather;
	res.redirect('/todayWeather');
})

module.exports = controller;
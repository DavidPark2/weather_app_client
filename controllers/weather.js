var express = require('express');
var controller = express.Router();
var weatherRequest = require('../public/javascripts/request');

/* GET home page. */
controller.get('/', function(req, res, next) {

  	res.render('weather');
})

// get weather information from rest api
controller.post('/input', function(req, res, next) {
	var inputLocation = req.body.area;
	var inputAccount = req.session.email;

	console.log(inputLocation)
	console.log('^^^^^^^^^^^^^^^^^^inputlocation')
	console.log(inputAccount)
	console.log('^^^^^^^^^^^^^^^^^^inputAccount')

	var requestedWeather = weatherRequest.weatherInput(inputLocation, inputAccount);
	console.log(requestedWeather)
	console.log('^^^^^^^^^^^^^^^^^^requestedWeather')
	req.session.weather = requestedWeather;
	res.redirect('/todayWeather');
})

module.exports = controller;
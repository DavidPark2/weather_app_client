var express = require('express');
var controller = express.Router();
var weatherRequest = require('../public/javascripts/request');

/* GET home page. */
controller.get('/', function(req, res, next) {

  	res.render('weather');
})

controller.post('/input', function(req, res, next) {
	var inputLocation = req.body.area;
	var inputAccount = req.session.account;

	var requestedWeather = weatherRequest.weatherInput(inputLocation, inputAccount);
	req.session.weather = requestedWeather;
	res.redirect('/todayWeather');
})

module.exports = controller;
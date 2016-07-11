var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Session information
	var todayWeather = req.session.weather;

	var hourlyWeather = todayWeather.allWeather.current.hourly.data;

	// Pushing information selected from below
	var filteredHourlyWeather = [];

	// Selecting information receieved from rest API
	for(var i = 0; i < hourlyWeather.length; i++) {
		filteredHourlyWeather.push({
			time: timestamp.convertTime(hourlyWeather[i].time),
			temp: parseInt(hourlyWeather[i].temperature) + '/' + parseInt(hourlyWeather[i].apparentTemperature),
			summary: hourlyWeather[i].summary,
			rain: parseInt(hourlyWeather[i].precipProbability * 100),
			humidity: hourlyWeather[i].humidity * 100
		})
	}

  	res.render('hourly', {location: todayWeather.coordinatesAndCity.results[0].formatted_address,
  						hour: filteredHourlyWeather
  	});
})

module.exports = controller;
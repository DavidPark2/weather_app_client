var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Session information
	var fiveDayWeather = req.session.weather;

	var dailyWeather = fiveDayWeather.allWeather.current.daily.data;

	var filteredDailyWeather = [];

	for(var i = 0; i < dailyWeather.length; i++) {
		filteredDailyWeather.push({
			day: timestamp.convertDay(dailyWeather[i].time),
			high: parseInt(dailyWeather[i].temperatureMax),
			low: parseInt(dailyWeather[i].temperatureMin),
			summary: dailyWeather[i].summary,
			rain: parseInt(dailyWeather[i].precipProbability * 100),
			humidity: dailyWeather[i].humidity * 100,
			rise: timestamp.convertTime(dailyWeather[i].sunriseTime),
			set: timestamp.convertTime(dailyWeather[i].sunsetTime)
		})
	}


  	res.render('five-days', {location: fiveDayWeather.coordinatesAndCity.results[0].formatted_address,
  						days: filteredDailyWeather
  });
})

module.exports = controller;
var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {

	var todayWeather = req.session.weather;

	var sunrise = todayWeather.allWeather.current.daily.data[0].sunriseTime;
	var sunset = todayWeather.allWeather.current.daily.data[0].sunsetTime;

	var convertedSunrise = timestamp.convertTime(sunrise);
	var convertedSunset = timestamp.convertTime(sunset);

  	res.render('today', {location: todayWeather.coordinatesAndCity.results[0].formatted_address, 
  		      temp: parseInt(todayWeather.allWeather.current.currently.temperature), 
  		      humidity: parseInt(todayWeather.allWeather.current.currently.humidity * 100),
  		      feelLike: parseInt(todayWeather.allWeather.current.currently.apparentTemperature), 
  		      wind: parseInt(todayWeather.allWeather.current.currently.windSpeed),
  		      summary: todayWeather.allWeather.current.currently.summary, 
  		      visibility: parseInt(todayWeather.allWeather.current.currently.visibility),
  		      sunrise: convertedSunrise, 
  		      dewpoint: parseInt(todayWeather.allWeather.current.currently.dewPoint),
  		      sunset: convertedSunset, 
  		      rain: parseInt(todayWeather.allWeather.current.currently.precipProbability * 100)
  		  });
})

module.exports = controller;
var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Need to change location
	console.log('--------------------reqqqq!');
	console.log(req.session.weather);
	todayWeather = req.session.weather;

	var sunrise = todayWeather.allWeather.current.daily.data[0].sunriseTime;
	var sunset = todayWeather.allWeather.current.daily.data[0].sunsetTime;

	var convertedSunrise = timestamp.convertTime(sunrise);
	var convertedSunset = timestamp.convertTime(sunset);

  	res.render('today', {location: todayWeather.coordinatesAndCity.results[0].formatted_address, 
  		      temp: todayWeather.allWeather.current.currently.temperature, 
  		      humidity: todayWeather.allWeather.current.currently.humidity * 100,
  		      feelLike: todayWeather.allWeather.current.currently.apparentTemperature, 
  		      wind: todayWeather.allWeather.current.currently.windSpeed,
  		      summary: todayWeather.allWeather.current.currently.summary, 
  		      visibility: todayWeather.allWeather.current.currently.visibility,
  		      sunrise: convertedSunrise, 
  		      dewpoint: todayWeather.allWeather.current.currently.dewPoint,
  		      sunset: convertedSunset, 
  		      rain: todayWeather.allWeather.current.currently.precipProbability
  		  });
})

module.exports = controller;
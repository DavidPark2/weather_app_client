var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {

	var todayWeather = req.session.weather;

  function trueOrFalse() {
    if (todayWeather === undefined) {
      return false;
    } else {
      return true;
    }
  }

  function trueOfFalseSun() {
    if (trueOrFalse() === true) {
      return { convertedSunrise: timestamp.convertTime(todayWeather.allWeather.current.daily.data[0].sunriseTime),
               convertedSunset: timestamp.convertTime(todayWeather.allWeather.current.daily.data[0].sunsetTime)
      }
    }
  }

  // var convertedSunrise = timestamp.convertTime(todayWeather.allWeather.current.daily.data[0].sunriseTime);
  // var convertedSunset = timestamp.convertTime(todayWeather.allWeather.current.daily.data[0].sunsetTime);

	res.render('today', trueOrFalse() ? { location: todayWeather.coordinatesAndCity.results[0].formatted_address, 
		      temp: parseInt(todayWeather.allWeather.current.currently.temperature), 
		      humidity: parseInt(todayWeather.allWeather.current.currently.humidity * 100),
		      feelLike: parseInt(todayWeather.allWeather.current.currently.apparentTemperature), 
		      wind: parseInt(todayWeather.allWeather.current.currently.windSpeed),
		      summary: todayWeather.allWeather.current.currently.summary, 
		      visibility: parseInt(todayWeather.allWeather.current.currently.visibility),
		      sunrise: trueOfFalseSun().convertedSunrise, 
		      dewpoint: parseInt(todayWeather.allWeather.current.currently.dewPoint),
		      sunset: trueOfFalseSun().convertedSunset, 
		      rain: parseInt(todayWeather.allWeather.current.currently.precipProbability * 100)
  } : {location: 'To get started, enter your location above'});
})

module.exports = controller;
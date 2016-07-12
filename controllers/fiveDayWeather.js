var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Session information
	var fiveDayWeather = req.session.weather;

	function trueOrFalse() {
	    if (fiveDayWeather === undefined) {
	      	return false;
	    } else {
	      	return true;
	    }
  	}

  	function trueOfFalseDaily() {
    	if (trueOrFalse() === true) {
    		var dailyWeather = fiveDayWeather.allWeather.current.daily.data;
    		// Pushing information selected from below
    		var filteredDailyWeather = [];
    		// Selecting information receieved from rest API
			for(var i = 0; i < dailyWeather.length; i++) {
				filteredDailyWeather.push({
					day: timestamp.convertDay(dailyWeather[i].time),
					high: parseInt(dailyWeather[i].temperatureMax),
					low: parseInt(dailyWeather[i].temperatureMin),
					summary: dailyWeather[i].summary,
					rain: parseInt(dailyWeather[i].precipProbability * 100),
					humidity: parseInt(dailyWeather[i].humidity * 100),
					rise: timestamp.convertTime(dailyWeather[i].sunriseTime),
					set: timestamp.convertTime(dailyWeather[i].sunsetTime)
				})
			}

      		return { 
      			filteredDailyWeather: filteredDailyWeather
      		}
    	}
  	}

  	res.render('five-days', trueOrFalse() ? {location: fiveDayWeather.coordinatesAndCity.results[0].formatted_address,
  						days: trueOfFalseDaily().filteredDailyWeather
  } : {location: 'To get started, enter your location above'});
})

module.exports = controller;
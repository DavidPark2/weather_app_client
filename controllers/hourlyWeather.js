var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Session information
	var todayWeather = req.session.weather;

	function trueOrFalse() {
	    if (todayWeather === undefined) {
	      	return false;
	    } else {
	      	return true;
	    }
  	}

  	function trueOfFalseHourly() {
    	if (trueOrFalse() === true) {
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
					humidity: parseInt(hourlyWeather[i].humidity * 100)
				})
			}

      		return { 
      			filteredHourlyWeather: filteredHourlyWeather
      		}
    	}
  	}

  	res.render('hourly', trueOrFalse() ? {location: todayWeather.coordinatesAndCity.results[0].formatted_address,
  						hour: trueOfFalseHourly().filteredHourlyWeather
  	} : {location: 'To get started, enter your location above'});
})

controller.get('/data', function(req, res, next) {
	var hourlyData = req.session.weather;

	if (hourlyData === undefined) {
		res.json({ 'success': false })
	} else {
		res.json({ 'hourlyData': hourlyData})
	}
})

module.exports = controller;
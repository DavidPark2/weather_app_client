var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// session information
	var yearlyWeather = req.session.weather;

	function trueOrFalse() {
	    if (yearlyWeather === undefined) {
	      	return false;
	    } else {
	      	return true;
	    }
  	}

  	function trueOrFalseYearly() {
	    if (trueOrFalse() === true) {
	      return { currentYear: yearlyWeather.allWeather.current.daily.data[0],
					oneYearBefore: yearlyWeather.allWeather.one.daily.data[0],
					twoYearBefore: yearlyWeather.allWeather.two.daily.data[0],
					threeYearBefore: yearlyWeather.allWeather.three.daily.data[0],
					fourYearBefore: yearlyWeather.allWeather.four.daily.data[0],
					fiveYearBefore: yearlyWeather.allWeather.five.daily.data[0]
	      }
	    }
	  }

	// var currentYear = yearlyWeather.allWeather.current.daily.data[0];
	// var oneYearBefore = yearlyWeather.allWeather.one.daily.data[0];
	// var twoYearBefore = yearlyWeather.allWeather.two.daily.data[0];
	// var threeYearBefore = yearlyWeather.allWeather.three.daily.data[0];
	// var fourYearBefore = yearlyWeather.allWeather.four.daily.data[0];
	// var fiveYearBefore = yearlyWeather.allWeather.five.daily.data[0];

	res.render('yearly', trueOrFalse() ? {location: yearlyWeather.coordinatesAndCity.results[0].formatted_address, 
						years: [
						{ date: timestamp.convertDate(trueOrFalseYearly().currentYear.time),
						high: parseInt(trueOrFalseYearly().currentYear.temperatureMax), 
						low: parseInt(trueOrFalseYearly().currentYear.temperatureMin),
						fhigh: parseInt(trueOrFalseYearly().currentYear.apparentTemperatureMax), 
						flow: parseInt(trueOrFalseYearly().currentYear.apparentTemperatureMin),
						summary: trueOrFalseYearly().currentYear.summary,
						wind: parseInt(trueOrFalseYearly().currentYear.windSpeed),
						humidity: parseInt(trueOrFalseYearly().currentYear.humidity * 100) },
						
						{ date: timestamp.convertDate(trueOrFalseYearly().oneYearBefore.time),
						high: parseInt(trueOrFalseYearly().oneYearBefore.temperatureMax), 
						low: parseInt(trueOrFalseYearly().oneYearBefore.temperatureMin),
						fhigh: parseInt(trueOrFalseYearly().oneYearBefore.apparentTemperatureMax), 
						flow: parseInt(trueOrFalseYearly().oneYearBefore.apparentTemperatureMin),
						summary: trueOrFalseYearly().oneYearBefore.summary,
						wind: parseInt(trueOrFalseYearly().oneYearBefore.windSpeed),
						humidity: parseInt(trueOrFalseYearly().oneYearBefore.humidity * 100) },

						{ date: timestamp.convertDate(trueOrFalseYearly().twoYearBefore.time),
						high: parseInt(trueOrFalseYearly().twoYearBefore.temperatureMax), 
						low: parseInt(trueOrFalseYearly().twoYearBefore.temperatureMin),
						fhigh: parseInt(trueOrFalseYearly().twoYearBefore.apparentTemperatureMax), 
						flow: parseInt(trueOrFalseYearly().twoYearBefore.apparentTemperatureMin),
						summary: trueOrFalseYearly().twoYearBefore.summary,
						wind: parseInt(trueOrFalseYearly().twoYearBefore.windSpeed),
						humidity: parseInt(trueOrFalseYearly().twoYearBefore.humidity * 100) },

						{ date: timestamp.convertDate(trueOrFalseYearly().threeYearBefore.time),
						high: parseInt(trueOrFalseYearly().threeYearBefore.temperatureMax), 
						low: parseInt(trueOrFalseYearly().threeYearBefore.temperatureMin),
						fhigh: parseInt(trueOrFalseYearly().threeYearBefore.apparentTemperatureMax), 
						flow: parseInt(trueOrFalseYearly().threeYearBefore.apparentTemperatureMin),
						summary: trueOrFalseYearly().threeYearBefore.summary,
						wind: parseInt(trueOrFalseYearly().threeYearBefore.windSpeed),
						humidity: parseInt(trueOrFalseYearly().threeYearBefore.humidity * 100) },

						{ date: timestamp.convertDate(trueOrFalseYearly().fourYearBefore.time),
						high: parseInt(trueOrFalseYearly().fourYearBefore.temperatureMax), 
						low: parseInt(trueOrFalseYearly().fourYearBefore.temperatureMin),
						fhigh: parseInt(trueOrFalseYearly().fourYearBefore.apparentTemperatureMax), 
						flow: parseInt(trueOrFalseYearly().fourYearBefore.apparentTemperatureMin),
						summary: trueOrFalseYearly().fourYearBefore.summary,
						wind: parseInt(trueOrFalseYearly().fourYearBefore.windSpeed),
						humidity: parseInt(trueOrFalseYearly().fourYearBefore.humidity * 100) },

						{ date: timestamp.convertDate(trueOrFalseYearly().fiveYearBefore.time),
						high: parseInt(trueOrFalseYearly().fiveYearBefore.temperatureMax), 
						low: parseInt(trueOrFalseYearly().fiveYearBefore.temperatureMin),
						fhigh: parseInt(trueOrFalseYearly().fiveYearBefore.apparentTemperatureMax), 
						flow: parseInt(trueOrFalseYearly().fiveYearBefore.apparentTemperatureMin),
						summary: trueOrFalseYearly().fiveYearBefore.summary,
						wind: parseInt(trueOrFalseYearly().fiveYearBefore.windSpeed),
						humidity: parseInt(trueOrFalseYearly().fiveYearBefore.humidity * 100) },

		]
	} : {location: 'To get started, enter your location above'});
})

module.exports = controller;
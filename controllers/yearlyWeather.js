var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// session information
	var yearlyWeather = req.session.weather;

	var currentYear = yearlyWeather.allWeather.current.daily.data[0];
	var oneYearBefore = yearlyWeather.allWeather.one.daily.data[0];
	var twoYearBefore = yearlyWeather.allWeather.two.daily.data[0];
	var threeYearBefore = yearlyWeather.allWeather.three.daily.data[0];
	var fourYearBefore = yearlyWeather.allWeather.four.daily.data[0];
	var fiveYearBefore = yearlyWeather.allWeather.five.daily.data[0];

	res.render('yearly', {location: yearlyWeather.coordinatesAndCity.results[0].formatted_address, 
						years: [
						{ date: timestamp.convertDate(currentYear.time),
						high: parseInt(currentYear.temperatureMax), 
						low: parseInt(currentYear.temperatureMin),
						fhigh: parseInt(currentYear.apparentTemperatureMax), 
						flow: parseInt(currentYear.apparentTemperatureMin),
						summary: currentYear.summary,
						wind: parseInt(currentYear.windSpeed),
						humidity: parseInt(currentYear.humidity) },
						
						{ date: timestamp.convertDate(oneYearBefore.time),
						high: parseInt(oneYearBefore.temperatureMax), 
						low: parseInt(oneYearBefore.temperatureMin),
						fhigh: parseInt(oneYearBefore.apparentTemperatureMax), 
						flow: parseInt(oneYearBefore.apparentTemperatureMin),
						summary: oneYearBefore.summary,
						wind: parseInt(oneYearBefore.windSpeed),
						humidity: parseInt(oneYearBefore.humidity) },

						{ date: timestamp.convertDate(twoYearBefore.time),
						high: parseInt(twoYearBefore.temperatureMax), 
						low: parseInt(twoYearBefore.temperatureMin),
						fhigh: parseInt(twoYearBefore.apparentTemperatureMax), 
						flow: parseInt(twoYearBefore.apparentTemperatureMin),
						summary: twoYearBefore.summary,
						wind: parseInt(twoYearBefore.windSpeed),
						humidity: parseInt(twoYearBefore.humidity) },

						{ date: timestamp.convertDate(threeYearBefore.time),
						high: parseInt(threeYearBefore.temperatureMax), 
						low: parseInt(threeYearBefore.temperatureMin),
						fhigh: parseInt(threeYearBefore.apparentTemperatureMax), 
						flow: parseInt(threeYearBefore.apparentTemperatureMin),
						summary: threeYearBefore.summary,
						wind: parseInt(threeYearBefore.windSpeed),
						humidity: parseInt(threeYearBefore.humidity) },

						{ date: timestamp.convertDate(fourYearBefore.time),
						high: parseInt(fourYearBefore.temperatureMax), 
						low: parseInt(fourYearBefore.temperatureMin),
						fhigh: parseInt(fourYearBefore.apparentTemperatureMax), 
						flow: parseInt(fourYearBefore.apparentTemperatureMin),
						summary: fourYearBefore.summary,
						wind: parseInt(fourYearBefore.windSpeed),
						humidity: parseInt(fourYearBefore.humidity) },

						{ date: timestamp.convertDate(fiveYearBefore.time),
						high: parseInt(fiveYearBefore.temperatureMax), 
						low: parseInt(fiveYearBefore.temperatureMin),
						fhigh: parseInt(fiveYearBefore.apparentTemperatureMax), 
						flow: parseInt(fiveYearBefore.apparentTemperatureMin),
						summary: fiveYearBefore.summary,
						wind: parseInt(fiveYearBefore.windSpeed),
						humidity: parseInt(fiveYearBefore.humidity) },

		]
	});
})

module.exports = controller;
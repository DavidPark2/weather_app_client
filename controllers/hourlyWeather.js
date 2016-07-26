var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
    // Session information
    var todayWeather = req.session.weather;

    console.log(todayWeather);
    console.log('------------testing req.session.weather todayWeather')
        // determine if req.session.weather contains information, if so
        // return true
    function trueOrFalse() {
        if (todayWeather === undefined) {
            return false;
        } else {
            return true;
        }
    }

    // select the information needed
    function trueOfFalseHourly() {
        if (trueOrFalse() === true) {
            var hourlyWeather = todayWeather.allWeather.current.hourly.data;
            // Pushing information selected from below
            var filteredHourlyWeather = [];
            // Selecting information receieved from rest API
            for (var i = 0; i < 24; i++) {
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

    // render information
    res.render('hourly', trueOrFalse() ? {
        location: todayWeather.coordinatesAndCity.results[0].formatted_address,
        hour: trueOfFalseHourly().filteredHourlyWeather
    } : { location: 'To get started, enter your location above' });
})

// *******for future, for chart data, didn't work out for now
// ******** chart went wacky because it went from 24 then back to 1
// controller.post('/data', function(req, res, next) {
// 	var hourlyData = req.session.weather;
// 	var hourlyWeather = hourlyData.allWeather.current.hourly.data;
// 	console.log(hourlyWeather);
// 	// Pushing information selected from below
// 	var filteredHourlyWeather = [];
// 	// Selecting information receieved from rest API
// 	for(var i = 0; i < 24; i++) {
// 		filteredHourlyWeather.push({
// 			temperature: parseInt(hourlyWeather[i].temperature),
// 			hour: timestamp.convertHour(hourlyWeather[i].time)
// 		})
// 	}
// 	console.log(filteredHourlyWeather);


// 	if (hourlyData === undefined) {
// 		res.json({ 'success': false })
// 	} else {
// 		res.json({ 'data': filteredHourlyWeather})
// 	}
// })

module.exports = controller;

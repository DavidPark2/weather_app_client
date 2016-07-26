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

    // if true, target information inside json
    function trueOrFalseYearly() {
        if (trueOrFalse() === true) {
            return {
                currentYear: yearlyWeather.allWeather.current.daily.data[0],
                oneYearBefore: yearlyWeather.allWeather.one.daily.data[0],
                twoYearBefore: yearlyWeather.allWeather.two.daily.data[0],
                threeYearBefore: yearlyWeather.allWeather.three.daily.data[0],
                fourYearBefore: yearlyWeather.allWeather.four.daily.data[0],
                fiveYearBefore: yearlyWeather.allWeather.five.daily.data[0]
            }
        }
    }

    // if true, render requested json to html
    res.render('yearly', trueOrFalse() ? {
        location: yearlyWeather.coordinatesAndCity.results[0].formatted_address,
        years: [{
                date: timestamp.convertDate(trueOrFalseYearly().currentYear.time),
                high: parseInt(trueOrFalseYearly().currentYear.temperatureMax),
                low: parseInt(trueOrFalseYearly().currentYear.temperatureMin),
                fhigh: parseInt(trueOrFalseYearly().currentYear.apparentTemperatureMax),
                flow: parseInt(trueOrFalseYearly().currentYear.apparentTemperatureMin),
                summary: trueOrFalseYearly().currentYear.summary,
                wind: parseInt(trueOrFalseYearly().currentYear.windSpeed),
                humidity: parseInt(trueOrFalseYearly().currentYear.humidity * 100)
            },

            {
                date: timestamp.convertDate(trueOrFalseYearly().oneYearBefore.time),
                high: parseInt(trueOrFalseYearly().oneYearBefore.temperatureMax),
                low: parseInt(trueOrFalseYearly().oneYearBefore.temperatureMin),
                fhigh: parseInt(trueOrFalseYearly().oneYearBefore.apparentTemperatureMax),
                flow: parseInt(trueOrFalseYearly().oneYearBefore.apparentTemperatureMin),
                summary: trueOrFalseYearly().oneYearBefore.summary,
                wind: parseInt(trueOrFalseYearly().oneYearBefore.windSpeed),
                humidity: parseInt(trueOrFalseYearly().oneYearBefore.humidity * 100)
            },

            {
                date: timestamp.convertDate(trueOrFalseYearly().twoYearBefore.time),
                high: parseInt(trueOrFalseYearly().twoYearBefore.temperatureMax),
                low: parseInt(trueOrFalseYearly().twoYearBefore.temperatureMin),
                fhigh: parseInt(trueOrFalseYearly().twoYearBefore.apparentTemperatureMax),
                flow: parseInt(trueOrFalseYearly().twoYearBefore.apparentTemperatureMin),
                summary: trueOrFalseYearly().twoYearBefore.summary,
                wind: parseInt(trueOrFalseYearly().twoYearBefore.windSpeed),
                humidity: parseInt(trueOrFalseYearly().twoYearBefore.humidity * 100)
            },

            {
                date: timestamp.convertDate(trueOrFalseYearly().threeYearBefore.time),
                high: parseInt(trueOrFalseYearly().threeYearBefore.temperatureMax),
                low: parseInt(trueOrFalseYearly().threeYearBefore.temperatureMin),
                fhigh: parseInt(trueOrFalseYearly().threeYearBefore.apparentTemperatureMax),
                flow: parseInt(trueOrFalseYearly().threeYearBefore.apparentTemperatureMin),
                summary: trueOrFalseYearly().threeYearBefore.summary,
                wind: parseInt(trueOrFalseYearly().threeYearBefore.windSpeed),
                humidity: parseInt(trueOrFalseYearly().threeYearBefore.humidity * 100)
            },

            {
                date: timestamp.convertDate(trueOrFalseYearly().fourYearBefore.time),
                high: parseInt(trueOrFalseYearly().fourYearBefore.temperatureMax),
                low: parseInt(trueOrFalseYearly().fourYearBefore.temperatureMin),
                fhigh: parseInt(trueOrFalseYearly().fourYearBefore.apparentTemperatureMax),
                flow: parseInt(trueOrFalseYearly().fourYearBefore.apparentTemperatureMin),
                summary: trueOrFalseYearly().fourYearBefore.summary,
                wind: parseInt(trueOrFalseYearly().fourYearBefore.windSpeed),
                humidity: parseInt(trueOrFalseYearly().fourYearBefore.humidity * 100)
            },

            {
                date: timestamp.convertDate(trueOrFalseYearly().fiveYearBefore.time),
                high: parseInt(trueOrFalseYearly().fiveYearBefore.temperatureMax),
                low: parseInt(trueOrFalseYearly().fiveYearBefore.temperatureMin),
                fhigh: parseInt(trueOrFalseYearly().fiveYearBefore.apparentTemperatureMax),
                flow: parseInt(trueOrFalseYearly().fiveYearBefore.apparentTemperatureMin),
                summary: trueOrFalseYearly().fiveYearBefore.summary,
                wind: parseInt(trueOrFalseYearly().fiveYearBefore.windSpeed),
                humidity: parseInt(trueOrFalseYearly().fiveYearBefore.humidity * 100)
            },

        ]
    } : { location: 'To get started, enter your location above' });
})

// this is for d3 chart
controller.post('/data', function(req, res, next) {
    var yearlyWeather = req.session.weather;

    function trueOrFalseYearly() {
        return {
            currentYear: yearlyWeather.allWeather.current.daily.data[0],
            oneYearBefore: yearlyWeather.allWeather.one.daily.data[0],
            twoYearBefore: yearlyWeather.allWeather.two.daily.data[0],
            threeYearBefore: yearlyWeather.allWeather.three.daily.data[0],
            fourYearBefore: yearlyWeather.allWeather.four.daily.data[0],
            fiveYearBefore: yearlyWeather.allWeather.five.daily.data[0]
        }
    }

    console.log(trueOrFalseYearly());
    console.log('^^^^^^^^^^^^^^^^^Yearly')


    if (yearlyWeather === undefined) {
        res.json({ 'success': false })
    } else {
        res.json({
            yearsHigh: [{
                temperature: parseInt(trueOrFalseYearly().currentYear.temperatureMax),
                year: timestamp.convertYear(trueOrFalseYearly().currentYear.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().oneYearBefore.temperatureMax),
                year: timestamp.convertYear(trueOrFalseYearly().oneYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().twoYearBefore.temperatureMax),
                year: timestamp.convertYear(trueOrFalseYearly().twoYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().threeYearBefore.temperatureMax),
                year: timestamp.convertYear(trueOrFalseYearly().threeYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().fourYearBefore.temperatureMax),
                year: timestamp.convertYear(trueOrFalseYearly().fourYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().fiveYearBefore.temperatureMax),
                year: timestamp.convertYear(trueOrFalseYearly().fiveYearBefore.time)
            }],
            yearsLow: [{
                temperature: parseInt(trueOrFalseYearly().currentYear.temperatureMin),
                year: timestamp.convertYear(trueOrFalseYearly().currentYear.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().oneYearBefore.temperatureMin),
                year: timestamp.convertYear(trueOrFalseYearly().oneYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().twoYearBefore.temperatureMin),
                year: timestamp.convertYear(trueOrFalseYearly().twoYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().threeYearBefore.temperatureMin),
                year: timestamp.convertYear(trueOrFalseYearly().threeYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().fourYearBefore.temperatureMin),
                year: timestamp.convertYear(trueOrFalseYearly().fourYearBefore.time)
            }, {
                temperature: parseInt(trueOrFalseYearly().fiveYearBefore.temperatureMin),
                year: timestamp.convertYear(trueOrFalseYearly().fiveYearBefore.time)
            }]
        })
    }
})





module.exports = controller;

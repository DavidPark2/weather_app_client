var express = require('express');
var controller = express.Router();

// -------------Get redirect to weather controller
controller.get('/', function(req, res, next) {
        res.redirect('/weather');
    })
    // --------------Get logout
controller.get('/logout', function(req, res, next) {
    if (req.session.account === undefined) {
        res.redirect('/accounts');
    } else {
        req.session.account = undefined;
        if (req.session.weather != undefined) {
            req.session.weather.searchHistory = undefined;
        }

        console.log('You have been logged out');
        res.redirect('/searchHistory');
    }
})

module.exports = controller;

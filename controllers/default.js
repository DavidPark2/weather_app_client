var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res, next) {
	res.redirect('/weather');
})

module.exports = controller;
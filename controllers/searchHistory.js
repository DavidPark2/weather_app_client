var express = require('express');
var controller = express.Router();

var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res, next) {
	// Need to change location
  res.render('search-history', {date: '7/4/16',
  						location: 'Chicago, IL'
  });
})

module.exports = controller;

module.exports = controller;
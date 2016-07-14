var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {

	var accountHist = req.session.account;

	// determine whether req.session.account has account 
	// information and either return false or true
	function trueOrFalse() {
	    if (accountHist === undefined) {
	    	console.log('returned false')
	      	return false;
	    } else {
	    	console.log('returned true')
	      	return true;
	    }
  	}

  	// If true, select information from request account information
  	function trueOfFalseHistory() {
    	if (trueOrFalse() === true) {
    		var searchHistoryRefining = accountHist.searchHistory;

    		// Pushing information selected from below
    		var filteredHourlyWeather = [];
    		// Selecting information receieved from rest API
			for(var i = 0; i < searchHistoryRefining.length; i++) {
				filteredHourlyWeather.push({
					location: accountHist.searchHistory[i].location,
					date: timestamp.convertDate(accountHist.searchHistory[i].created_at / 1000)
				})
			}

      		return { 
      			filteredHourlyWeather: filteredHourlyWeather
      		}
    	}
  	}

  	// render information
  	res.render('search-history', trueOrFalse() ? {searchHistory: 'Search History',
  								searchLoop: trueOfFalseHistory().filteredHourlyWeather
  	} : { searchHistory: 'Please log in.'});
})


module.exports = controller;
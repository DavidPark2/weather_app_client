var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Need to change location
	var searchHist = req.session.weather;
	var accountHist = req.session.account;

	console.log(accountHist);
	console.log('^^^^^^^^^^^req accounts')

	function trueOrFalse() {
	    if (accountHist === undefined) {
	    	console.log('returned false')
	      	return false;
	    } else {
	    	console.log('returned true')
	      	return true;
	    }
  	}

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


  	// var searchHistoryRefining = searchHistory.searchHistory;

  	res.render('search-history', trueOrFalse() ? {searchHistory: 'Search History',
  								searchLoop: trueOfFalseHistory().filteredHourlyWeather
  	} : { searchHistory: 'Please log in.'});
})


module.exports = controller;
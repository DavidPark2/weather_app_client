var express = require('express');
var controller = express.Router();
var timestamp = require('../public/javascripts/timestampConverter');

controller.get('/', function(req, res, next) {
	// Need to change location
	var searchHist = req.session.weather;

	function trueOrFalse() {
	    if (searchHist === undefined) {
	      	return false;
	    } else if (searchHist.searchHistory === undefined) {
	    	return false;
	    } else {
	      	return true;
	    }
  	}

  	function trueOfFalseHistory() {
    	if (trueOrFalse() === true) {
    		var searchHistoryRefining = searchHist.searchHistory;

    		// Pushing information selected from below
    		var filteredHourlyWeather = [];
    		// Selecting information receieved from rest API
			for(var i = 0; i < searchHistoryRefining.length; i++) {
				filteredHourlyWeather.push({
					location: searchHist.searchHistory[i].location,
					date: timestamp.convertDate(searchHist.searchHistory[i].created_at / 1000)
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
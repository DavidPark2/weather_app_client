function yearlyChart() {
	var data;
	$.ajax({
		method: 'post',
		url: 'http://localhost:4000/yearlyWeather/data',
		async: false,
		success: function(year) {
			data = year;
			console.log(year);
			console.log('^^^^^^^^^^^^^^^^year')
		},
		error: function(err) {
			console.log(err)
		}
	})

	var highTemp = data.yearsHigh;
	var lowTemp = data.yearsLow;

	console.log(data);
	console.log('^^^^^^^^^^^^^^data')


	var vis = d3.select("#visualisation"),
		WIDTH = 1000,
		HEIGHT = 500,
		MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
		},

		xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2011, 2016]),
	    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([50, 100]),

		xAxis = d3.svg.axis()
	        .scale(xScale).ticks(6),
		yAxis = d3.svg.axis()
	        .scale(yScale)
	        .orient("left");

	vis.append("svg:g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
	    .call(xAxis);

	vis.append("svg:g")
	    .attr("class", "y axis")
	    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
	    .call(yAxis);

	var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.year);
        })
        .y(function(d) {
            return yScale(d.temperature);
        })

	vis.append('svg:path')
        .attr('d', lineGen(highTemp))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    vis.append('svg:path')
        .attr('d', lineGen(lowTemp))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
}


// ******** for the future, chart went wacky because
// ********* it went from 24 then back to 1
// function hourlyChart() {
	// var data;
	// $.ajax({
	// 	method: 'post',
	// 	url: 'http://localhost:4000/hourlyweather/data',
	// 	async: false,
	// 	success: function(hour) {
	// 		data = hour;
	// 		console.log(hour);
	// 		console.log('^^^^^^^^^^^^^^^^hour')
	// 	},
	// 	error: function(err) {
	// 		console.log(err)
	// 	}
	// })

	// data = data.data;
	// console.log(data);
	// console.log('^^^^^^^^^^^^^^data')

// 	var vis = d3.select("#visualisation"),
// 		WIDTH = 1000,
// 		HEIGHT = 500,
// 		MARGINS = {
// 			top: 20,
// 			right: 20,
// 			bottom: 20,
// 			left: 50
// 		},

// 		xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, 24]),
// 	    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([50, 100]),

// 		xAxis = d3.svg.axis()
// 	        .scale(xScale),
// 		yAxis = d3.svg.axis()
// 	        .scale(yScale)
// 	        .orient("left");

// 	vis.append("svg:g")
// 	    .attr("class", "x axis")
// 	    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
// 	    .call(xAxis);

// 	vis.append("svg:g")
// 	    .attr("class", "y axis")
// 	    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
// 	    .call(yAxis);

// 	var lineGen = d3.svg.line()
//         .x(function(d) {
//             return xScale(d.hour);
//         })
//         .y(function(d) {
//             return yScale(d.temperature);
//         })
//         .interpolate("basis");

// 	vis.append('svg:path')
//         .attr('d', lineGen(data))
//         .attr('stroke', 'green')
//         .attr('stroke-width', 2)
//         .attr('fill', 'none');
// }

if (window.location.href === 'http://localhost:4000/hourlyweather') {
	hourlyChart();
} else if (window.location.href === 'http://localhost:4000/fiveDayWeather') {
	dailyChart();
} else if (window.location.href === 'http://localhost:4000/yearlyWeather') {
	yearlyChart()
}











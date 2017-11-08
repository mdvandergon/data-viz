//   Base chart space
var margin = {top: 20, right: 10, bottom: 20, left: 10},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Data and Parse Functions
var datafile = 'dataset.json';

// Load and Plot
d3.json(datafile, function(error, data) {
    if (error) throw error;

    // Wrangle
    data.forEach(function(d) {
        d.recession = d.recession;
        d.avg_perc_diff = +d.avg_perc_diff;
    });

    // X Scale
    var xScale = d3.scaleOrdinal()
    	.domain(data)
    	.range(['black', '#ccc']);
    svg.append('g')
        // reverse, so no transform and axisTop
        // .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisTop(xScale));

    // Y Scale
    var yScale = d3.scaleLinear()
        .domain([d3.max(data, function(d){ return d.avg_perc_diff }),
            d3.min(data, function(d){ return d.avg_perc_diff })])
            .range([height, 0]);
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Title and legend
    svg.append()

    svg.append()
    // Plot
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.recession); })
        .attr('y', 0)
        .attr('width', 0)
        .attr('height', function(d) { return height - d.avg_perc_diff; })
        .attr('rx', 2)
        .attr('ry', 2)
        .style('fill', function(d) { xScale(d) })
        .style('fill', function(d) {
            var gr
            if (d.recession == "12/1/07") { gr = "#ec008b"}
            return gr
        });

});


/*
Read the JSON data into D3 using D3.json;
Implement simple error handling to log an error to the console if it occurs reading in the data.
Use the unary plus operator to ensure the quantitative variable is read in correctly;

^^^^^^^ DONE ^^^^^^^
Create a Negative Bar Chart
A negative bar chart will have bars starting at 0 close to the top of the web page, and extending downwards. So the y-axis should similarly start at 0 near the top of the webpage, and increase towards the maximum value lower down on the page. Think of it as a bar chart flipped upside down.
Use D3's sort method (Links to an external site.)Links to an external site. to sort the data in an order of your preference, as long as it is different from how the data is read into D3.
Create an appropriate linear scale and axis for the continuous y variable;
Create an appropriate ordinal scale (Links to an external site.)Links to an external site. and axis for the categorical x variable;
Use d3 to apply a CSS class to bars that meet some criteria (e.g. they exceed a certain value, or are a certain category). Use CSS to change the color of bars with that class;
Use d3.append to add two SVG rect elements and two SVG text elements as a legend for the change in color;
Use d3.append to add SVG text elements for the graph title, subtitle, and axis labels.
*/

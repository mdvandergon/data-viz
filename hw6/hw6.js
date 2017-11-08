//   Base
var margin = {top: 20, right: 10, bottom: 20, left: 10},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// append
var svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Data and Parse
var parsedDate = d3.timeParse("%Y-%m-%d");
var datafile = '/path/to/file.csv';

d3.csv(datafile, function(error, data) {
    if (error) {
        console.log(error);
    }
    else {
        makePlot();
    }
});

// Bind and Flow
function makePlot() {

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, function(d) { return d.unemployment; }))
        .range([0, 450]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d){ return d.inflation }),
          d3.max(dataset, function(d){ return d.inflation})])
        .range([450, 0]);

    svg = d3.select("#chart")
              .append("svg")
              .attr('width', 600)
              .attr('height', 500);

    svg.append('g')
              .attr('transform', 'translate(' + 30 + ',' + 475 + ')')
              .call(d3.axisBottom(xScale));
    svg.append('g')
              .attr('transform', 'translate(' + 30 + ',' + 30 + ')')
              .call(d3.axisLeft(yScale));
    g = svg.append('g')
              .attr('transform', 'translate(' + 30 + ',' + 30 + ')')

    g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', )
        .attr('y', )
        .attr('width', width)
        .attr('height', height)
        .attr('rx', 0)
        .attr('ry', 0)
        .style('fill', '#111')
        .style("fill", function(d) {
        var clr
        if (d.year > 2007) { clr = "#ec008b"}
        return clr
        });
};

//   Base chart space
var margin = {top: 150, right: 30, bottom: 30, left: 80},
width = 900 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

var chart = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
var g = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Data and Parse Functions
var datafile = 'dataset.json';

// Load and Plot
d3.json(datafile,
    function(error, data) {
        if (error) throw error;
        // Wrangle
        data.forEach(function(d){
            d.avg_perc_diff = +d.avg_perc_diff;
        });
        data.sort(function(a, b) {
            return d3.ascending(a.avg_perc_diff, b.avg_perc_diff);
        });

        // X Scale
        var xScale = d3.scaleBand()
            .domain(data.map(function(d){ return d.recession; }))
            .range([0, width])
            .padding(0.1);

        g.append('g')
            // reverse, so no transform and axisTop
            .call(d3.axisTop(xScale))
            .append('text')
            .attr("text-anchor", "middle")
            .attr('class', 'axis')
            .text("Recessions")
            .attr("transform", "translate("+ width/2 + "," + (-margin.top/4) + ")rotate(0)");

        // Y Scale
        var yScale = d3.scaleLinear()
            .domain([d3.max(data, function(d){ return d.avg_perc_diff }),
                d3.min(data, function(d){ return d.avg_perc_diff })])
                .range([height, 0]);
        g.append('g')
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr("text-anchor", "right")
            .attr('class', 'axis')
            .text("% Difference Between the Taylor Rate and Fed Funds Rate")
            .attr("transform", "translate(" + -margin.left/2
                    + "," + 10
                    + ")rotate(-90)");

        // Title
        chart.append('text')
            .text("Around the Great Recession the Taylor Rule Stopped Tracking")
            .attr('x', margin.left)
            .attr('y', margin.top/3)
            .attr('font-size', '18px');

        chart.append('text')
            .text("recessions sorted by percent error")
            .attr('x', margin.left)
            .attr('y', margin.top/2)
            .attr('font-size', '14px');

        // Legend
        legend_x = 100
        legend_y = 100
        dim = 20
        padding = 10
        var legend = g.append('g')

        legend.append('rect')
                .attr('x', legend_x)
                .attr('y', legend_y)
                .attr('width', dim)
                .attr('height', dim)
                .attr('rx', 2)
                .attr('ry', 2)
                .style('fill', '#2F74FF')
        legend.append('text')
            .text("Before Great Recession")
            .attr('x', legend_x + dim + padding)
            .attr('y', legend_y + dim -2)
            .attr('font-size', '14px')
        legend.append('rect')
            .attr('x', legend_x)
            .attr('y', legend_y + dim + padding)
            .attr('width', dim)
            .attr('height', dim)
            .attr('rx', 0)
            .attr('ry', 0)
            .style('fill', '#FF6548')
        legend.append('text')
            .text("Great Recession")
            .attr('x', legend_x + dim+ padding)
            .attr('y', legend_y + dim*2 + padding-2)
            .attr('font-size', '14px')

        // Plot
        g.selectAll('bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function(d) { return xScale(d.recession); })
            .attr('y', 1)
            .attr('width', xScale.bandwidth())
            .attr('height', function(d) { return yScale(d.avg_perc_diff); })
            .attr('rx', 2)
            .attr('ry', 2)
            .text(function(d) {return d.avg_perc_diff;})
            .style('fill', function(d) {
                var gr
                if (d.recession == "12/1/07") { gr = "#FF6548"}
                return gr
            });
});

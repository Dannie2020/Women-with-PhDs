// bind the raw data and show the visualization
let data = d3.csv("salary_visual_data.csv", function (d) {
    return {
        job: d.N2OCPRNG,
        fSalary: +d.femaleSalary,
        mSalary: +d.maleSalary
    }
}).then(showData)


// create plot container and itsvariables
let plotContainer = d3.select("#salaryPlotContainer")

let plotVars = ({
    plotHeight: 800,
    plotWidth: 1000,
})

// create showData function
function showData(data) {
    // determine scales and axis
    // create x axis
    let xScale = d3.scaleLinear()
        .range([0, plotVars.plotWidth])
        .domain([0, 200000])

    let xAxis = d3.axisTop().scale(xScale)
        .tickFormat(function (d, i) {
            if (i == 0) {
                return "$0"
            } else {
                return d3.format(".2s")(d);
            }
        })

    let xAxisGroup = plotContainer.append("g")
        .attr("class", "x-axis-group");

    xAxisGroup.append("g")
        .attr("class", "x-axis")
        .call(xAxis)

    // create x axis label
    plotContainer.append("text")
        .attr("transform", `translate(${plotVars.plotWidth / 2}, ${-40})`)
        .attr("class", "label")
        .style("text-anchor", "middle")
        .text("Average Salary ($)")

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks()
    }

    // add the X gridlines
    plotContainer.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + plotVars.plotHeight + ")")
        .call(make_x_gridlines()
            .tickSize(-plotVars.plotHeight)
            .tickFormat("")
        )

    // create y axis
    let yScale = d3.scaleBand()
        .range([plotVars.plotHeight, 0])
        .domain(data.map(function (d) { return d.job }))
        .padding(1)

    plotContainer.append("g")
        .call(d3.axisLeft(yScale))

    // create y axis label
    plotContainer.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 300)
        .attr("x", 0 - (plotVars.plotHeight / 2))
        .attr("class", "label")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Category of job")

    // lines
    plotContainer.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) { return xScale(d.fSalary); })
        .attr("x2", function (d) { return xScale(d.mSalary); })
        .attr("y1", function (d) { return yScale(d.job); })
        .attr("y2", function (d) { return yScale(d.job); })
        .attr("stroke", "grey")
        .attr("stroke-width", "1px")

    // Circles of female salaries
    plotContainer.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.fSalary); })
        .attr("cy", function (d) { return yScale(d.job); })
        .attr("r", "6")
        .style("fill", "#e8505b")

    // Circles of male salaries
    plotContainer.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.mSalary); })
        .attr("cy", function (d) { return yScale(d.job); })
        .attr("r", "6")
        .style("fill", "#00b7c2")
}


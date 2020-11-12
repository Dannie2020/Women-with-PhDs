// build the legend
let salaryContainer = d3.select("#salaryContainer")
salaryContainer.append("circle").attr("cx", 390).attr("cy", 60).attr("r", 6).style("fill", "#e8505b")
salaryContainer.append("circle").attr("cx", 490).attr("cy", 60).attr("r", 6).style("fill", "#16a596")
salaryContainer.append("text").attr("x", 400).attr("y", 60).text("Female").style("font-size", "15px").attr("alignment-baseline", "middle")
salaryContainer.append("text").attr("x", 500).attr("y", 60).text("Male").style("font-size", "15px").attr("alignment-baseline", "middle")

// bind the raw data and show the visualization
let data = d3.csv("data/salary_visual_data.csv", function (d) {
    return {
        job: d.N2OCPRNG,
        fSalary: +d.FemaleSalary,
        mSalary: +d.MaleSalary,
        gap: +d.Gap
    }
}).then(showData)

// create plot container and its variables
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
        .attr("id", "xlabel")
        .style("text-anchor", "middle")
        .text("Average Salary ($)")

    // gridlines for x and y axis function
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks()
    }

    function make_y_gridlines() {
        return d3.axisLeft(yScale)
            .ticks()
    }

    // add the X gridlines
    plotContainer.append("g")
        .attr("class", "xgrid")
        .attr("transform", "translate(0," + plotVars.plotHeight + ")")
        .call(make_x_gridlines()
            .tickSize(-plotVars.plotHeight)
            .tickFormat("")
        )

    // create y axis
    let yScale = d3.scaleBand()
        .range([0, plotVars.plotHeight])
        .domain(data.map(function (d) { return d.job }))
        .padding(1)

    let yAxis = d3.axisLeft(yScale)
        .tickSize(6)

    let yAxisGroup = plotContainer.append("g")
        .attr("class", "y-axis-group")

    yAxisGroup.append("g")
        .attr("class", "y-axis")
        .call(yAxis)

    yAxisGroup.selectAll('.tick')
        .each(function (d) {
            if (d == "Biological, agricultural and other life scientists " || d == "Computer and mathematical scientists " || d == "Engineers " || d == "Non-S&E Occupations " || d == "Physical and related scientists " || d == "S&E related occupations " || d == "Social and related scientists ") {
                d3.select(this)
                    .selectAll('text')
                    .style("font-size", "13px")
                    .style("font-weight", "bold")

                plotContainer.append("g")
                    .attr("class", "ygrid")
                    .call(make_y_gridlines()
                        .tickSize(-plotVars.plotWidth)
                        .tickFormat("")
                        .tickValues(["Biological, agricultural and other life scientists ", "Computer and mathematical scientists ", "Engineers ", "Non-S&E Occupations ", "Physical and related scientists ", "S&E related occupations ", "Social and related scientists "])
                    )

            }
        })

    // create y axis label
    plotContainer.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 350)
        .attr("x", 0 - (plotVars.plotHeight / 2))
        .attr("class", "label")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Principal Job Category/Sub-category")

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
        .attr("class", "plotLine")

    // circles of female salaries
    plotContainer.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.fSalary); })
        .attr("cy", function (d) { return yScale(d.job); })
        .attr("r", "6")
        .attr("class", "lollipop-female")
        .style("fill", "#e8505b")
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel)

    // circles of male salaries
    plotContainer.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.mSalary); })
        .attr("cy", function (d) { return yScale(d.job); })
        .attr("r", "6")
        .attr("class", "lollipop-male")
        .style("fill", "#16a596")
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel)

    // show value on hover
    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

    let classToPos = {
        "lollipop-female": "fSalary",
        "lollipop-male": "mSalary",
    }

    let posToColor = {
        fSalary: "#e8505b",
        mSalary: "#16a596",
    }

    function showLabel() {
        let selection = d3.select(this);
        let pos = classToPos[selection.attr("class")];

        div.transition()
            .duration(100)
            .style("opacity", 0.9)
        div.html("$" + (selection.datum()[pos]))
            .style("left", (event.pageX - 30) + "px")
            .style("top", (event.pageY - 40) + "px")
            .style("background-color", posToColor[pos])
    }

    function moveLabel() {
        div.style("left", (event.pageX - 30) + "px")
            .style("top", (event.pageY - 40) + "px")
    }

    function hideLabel() {
        div.transition()
            .duration(200)
            .style("opacity", 0);
    }

    // add plot
    d3.select("#plotBy")
        .on("change", function () {
            var attribute = d3.select(this).property("value");
            plotLollipops(attribute);
        })

    function plotLollipops(attribute) {
        if (attribute == "Gap") {
            xScale.domain([0, 100])
            xAxis.scale(xScale)
                .tickFormat(function (d, i) {
                    if (i == 0) {
                        return "0%"
                    } else {
                        return d3.format(".2s")(d);
                    }
                })

            d3.select(".x-axis").call(xAxis)

            d3.selectAll(".plotLine")
                .transition()
                .duration(500)
                .attr("x1", 0)
                .attr("x2", function (d) { return xScale(d.gap); })
                .attr("y1", function (d) { return yScale(d.job); })
                .attr("y2", function (d) { return yScale(d.job); })

            d3.selectAll(".lollipop-female")
                .transition()
                .duration(500)
                .attr("cx", function (d) { return xScale(d.gap); })
                .attr("cy", function (d) { return yScale(d.job); })
                .attr("r", "6")

            d3.selectAll(".lollipop-male")
                .transition()
                .duration(500)
                .attr("cx", 0)
                .attr("cy", function (d) { return yScale(d.job); })
                .attr("r", "6")

            d3.select("#xlabel")
                .text("Average Salary Gap (%)")
        }
        else {
            xScale.domain([0, 200000])
            xAxis.scale(xScale)
                .tickFormat(function (d, i) {
                    if (i == 0) {
                        return "$0"
                    } else {
                        return d3.format(".2s")(d);
                    }
                })

            d3.select(".x-axis").call(xAxis)

            d3.selectAll(".plotLine")
                .transition()
                .duration(500)
                .attr("x1", function (d) { return xScale(d.fSalary); })
                .attr("x2", function (d) { return xScale(d.mSalary); })
                .attr("y1", function (d) { return yScale(d.job); })
                .attr("y2", function (d) { return yScale(d.job); })

            d3.selectAll(".lollipop-female")
                .transition()
                .duration(500)
                .attr("cx", function (d) { return xScale(d.fSalary); })
                .attr("cy", function (d) { return yScale(d.job); })
                .attr("r", "6")

            d3.selectAll(".lollipop-male")
                .transition()
                .duration(500)
                .attr("cx", function (d) { return xScale(d.mSalary); })
                .attr("cy", function (d) { return yScale(d.job); })
                .attr("r", "6")

            d3.select("#xlabel")
                .text("Average Salary ($)")
        }
    }

    // add sort
    /*
    d3.select("#sortBy")
        .on("change", function () {
            var attribute = d3.select(this).property("value");
            sortLollipops(attribute, 1);
        })

    function sortLollipops(attribute, ordering) {
        sortBy(data, attribute, 1);

        yScale.domain(data.map(function (d) { return d.job; })).copy();

        plotContainer
            .transition()
            .attr("transform", function (d) {
                return "translate(" + [0, (yScale(d.job) + yScale.bandwidth() / 2)] + ")";
            });

        yAxisGroup.select(".y-axis")
            .transition()
            .call(yAxis);
    }

    function sortBy(data, attribute, order) {
        data.sort(function (a, b) {
            if (a[attribute] < b[attribute]) return -1 * order;
            if (a[attribute] > b[attribute]) return 1 * order;
            return 0;
        });
    }

    sortBy(data, "Job Category", 1);
    yScale.domain(data.map(function (d) { return d.job }));
    xScale.domain([0, d3.max(data, function (d) { return d.max })]);
    xScale.nice();*/

}


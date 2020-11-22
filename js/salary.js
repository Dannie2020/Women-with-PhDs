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
        mainJob: d.N2OCPRMG,
        fSalary: + d.FemaleSalary,
        mSalary: +d.MaleSalary,
        relativeGap: +d.relativeGap,
        absoluteGap: +d.absoluteGap,
        academia: d.ACADEMIA,
    }
}).then(showData)

// create plot container and its variables
let plotContainer = d3.select("#salaryPlotContainer")

let plotVars = ({
    plotHeight: 800,
    plotWidth: 960,
})

// create showData function
function showData(data) {
    // filter data based on academic or industry
    let displayData = data.filter(function (d) { return d.academia == "TRUE" })
    window.addEventListener("load", () => { drawData(displayData); }, false);

    d3.select("#academia")
        .on("click", function () {
            displayData = data.filter(function (d) { return d.academia == "TRUE" });
            d3.selectAll(".plotLine").remove();
            d3.selectAll(".lollipop-female").remove();
            d3.selectAll(".lollipop-male").remove();
            yScale.domain(displayData.map(function (d) { return d.job }));
            yAxisGroup.call(yAxis);
            drawData(displayData);
            document.getElementById("sortBy").selectedIndex = "0";
            if (d3.select("select").node().value === "Gap") {
                plotLollipops("Gap");
            }
        })

    d3.select("#industry")
        .on("click", function () {
            displayData = data.filter(function (d) { return d.academia == "FALSE" });
            d3.selectAll(".plotLine").remove();
            d3.selectAll(".lollipop-female").remove();
            d3.selectAll(".lollipop-male").remove();
            yScale.domain(displayData.map(function (d) { return d.job }));
            yAxisGroup.call(yAxis);
            drawData(displayData);
            document.getElementById("sortBy").selectedIndex = "0";
            if (d3.select("select").node().value === "Gap") {
                plotLollipops("Gap");
            }
        })

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
        //.attr("transform", "rotate(-90)")
        //.attr("y", 0 - 350)
        //.attr("x", 0 - (plotVars.plotHeight / 2))
        .attr("y", 0 - 25)
        .attr("x", 0 - 170)
        .attr("class", "label")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Principal Job Category/Sub-category")

    function drawData(toBeDisplayedData) {
        // lines
        plotContainer.selectAll("myline")
            .data(toBeDisplayedData)
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
            .data(toBeDisplayedData)
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
            .data(toBeDisplayedData)
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
    }
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

    function plotLollipops(a) {
        if (a == "Gap") {
            xScale.domain([-100, 100])
            xAxis.scale(xScale)
                .tickFormat(function (d, i) {
                    if (i == 5) {
                        return "0%"
                    } else {
                        return d3.format(".2s")(d);
                    }
                })

            d3.select(".x-axis").call(xAxis)

            d3.selectAll(".plotLine")
                .transition()
                .duration(500)
                .attr("x1", 500)
                .attr("x2", function (d) { return xScale(d.relativeGap); })
                .attr("y1", function (d) { return yScale(d.job); })
                .attr("y2", function (d) { return yScale(d.job); })

            d3.selectAll(".lollipop-female")
                .transition()
                .duration(500)
                .attr("cx", 500)
                .attr("cy", function (d) { return yScale(d.job); })
                .attr("r", "6")

            d3.selectAll(".lollipop-male")
                .transition()
                .duration(500)
                .attr("cx", function (d) { return xScale(d.relativeGap); })
                .attr("cy", function (d) { return yScale(d.job); })
                .attr("r", "6")

            d3.select("#xlabel")
                .text("Average Salary Gap (%)")
        }
        else {
            xScale
                .domain([0, 200000])
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
    d3.select("#sortBy")
        .on("change", function () {
            var attribute = d3.select(this).property("value");
            sortLollipops(attribute);
        })

    function sortLollipops(attribute) {
        const index = d3.range(displayData.length);
        let plotByAttr = d3.select("#plotBy").property("value");
        //console.log('plotByAttr =', plotByAttr);
        let order = "job";
        if (attribute === "Job Category") order = "job";

        if (attribute === "Largest Gap") {
            if (plotByAttr === "Gap")
                order = "relativeGap";
            else
                order = "absoluteGap";
        }
        if (attribute === "Highest Paid Men Job") order = "mSalary";
        if (attribute === "Highest Paid Women Job") order = "fSalary";
        index.sort((i, j) => d3.descending(displayData[i][order], displayData[j][order]));
        //console.log(attribute);
        //console.log(order);
        let jobs = d3.permute(displayData.map(d => d.job), index);
        yScale.domain(jobs);
        yAxisGroup.call(yAxis);
        displayData = d3.permute(displayData, index);
        //console.log(displayData);
        plotLollipops(plotByAttr);
    }

}

// update sort by based on plot by
/*const sorts = {
    "Salary": [{ value: "Job Category", desc: "Job Category" }, { value: "Largest Gap", desc: "Largest Gap" }, { value: "Highest Paid Men Job", desc: "Highest Paid Men Job" }, { value: "Highest Paid Women Job", desc: "Highest Paid Women Job" }],
    "Gap": [{ value: "Job Category", desc: "Job Category" }, { value: "Ascending", desc: "Ascending" }, { value: "Descending", desc: "Descending" }]
}

const sort = document.getElementById("sortBy");
document.getElementById("plotBy").addEventListener('change', function (e) {
    sort.innerHTML = sorts[this.value].reduce((acc, elem) => `${acc}<option value="${elem.value}">${elem.desc}</option>`, "");
});*/


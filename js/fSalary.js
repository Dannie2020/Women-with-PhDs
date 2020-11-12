// build the legend
let fSalaryLegend = d3.select("#fSalaryLegend")
fSalaryLegend.append("text").attr("x", 0).attr("y", 0).text("Age (years)").style("font-size", "14px").style("font-weight", "bold")
fSalaryLegend.append("rect").attr("x", 0).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#9e0142")
fSalaryLegend.append("rect").attr("x", 40).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#d53e4f")
fSalaryLegend.append("rect").attr("x", 80).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#f46d43")
fSalaryLegend.append("rect").attr("x", 120).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#fdae61")
fSalaryLegend.append("rect").attr("x", 160).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#fee08b")
fSalaryLegend.append("rect").attr("x", 200).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#e6f598")
fSalaryLegend.append("rect").attr("x", 240).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#abdda4")
fSalaryLegend.append("rect").attr("x", 280).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#66c2a5")
fSalaryLegend.append("rect").attr("x", 320).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#3288bd")
fSalaryLegend.append("rect").attr("x", 360).attr("y", 20).attr("width", 40).attr("height", 10).style("fill", "#5e4fa2")
fSalaryLegend.append("text").attr("x", 0).attr("y", 40).text("≤29").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 40).attr("y", 40).text("30-34").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 80).attr("y", 40).text("35-39").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 120).attr("y", 40).text("40-44").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 160).attr("y", 40).text("45-49").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 200).attr("y", 40).text("50-54").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 240).attr("y", 40).text("55-59").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 280).attr("y", 40).text("60-64").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 320).attr("y", 40).text("65-69").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")
fSalaryLegend.append("text").attr("x", 360).attr("y", 40).text("70-75").attr("class", "fSalaryLegendLabel").attr("alignment-baseline", "middle")

// bind the raw data and show the visualization
let fSdata = d3.csv("data/female_age_salary.csv", function (d) {
    return {
        job: d.N2OCPRMG,
        age: d.AGEGRP,
        fSalary: + d.SALARYP,
    }
}).then(showData)


// create plot container and its variables
let fSplotContainer = d3.select("#fSalaryPlotContainer")

let fSplotVars = ({
    plotHeight: 400,
    plotWidth: 1000,
})

let dataByJob = [{ job: "Biological, agricultural and other life scientists", "<29": 57957.74, "30-34": 65885.81, "35-39": 71457, "40-44": 79495.9, "45-49": 88980.92, "50-54": 93996.85, "55-59": 109988.48, "60-64": 105464.03, "65-69": 90548.38, "70-75": 103414.28 },
{ job: "Computer and mathematical scientists", "<29": 100230.76, "30-34": 99283.5, "35-39": 95895.37, "40-44": 108797.14, "45-49": 102876.36, "50-54": 106913.38, "55-59": 119515.52, "60-64": 99802.81, "65-69": 98455.69, "70-75": 77888.88 },
{ job: "Engineers", "<29": 90902.43, "30-34": 88757.81, "35-39": 98027.33, "40-44": 97913.04, "45-49": 107567.68, "50-54": 117491.71, "55-59": 124273.38, "60-64": 125307.69, "65-69": 115200, "70-75": 138714.28 },
{ job: "Non-S&E Occupations", "<29": 78148.93, "30-34": 81631.37, "35-39": 84682.8, "40-44": 99653.36, "45-49": 106338.46, "50-54": 116013.69, "55-59": 118668.06, "60-64": 108458.2, "65-69": 100212.61, "70-75": 73404.34 },
{ job: "Physical and related scientists", "<29": 71666.66, "30-34": 76232.84, "35-39": 73860.1, "40-44": 85660.29, "45-49": 82396.55, "50-54": 98161.4, "55-59": 100070.58, "60-64": 98977.77, "65-69": 92750, "70-75": 97961.53 },
{ job: "S&E related occupations", "<29": 68606.06, "30-34": 80246.61, "35-39": 92598.66, "40-44": 107061.56, "45-49": 109018.36, "50-54": 119220.33, "55-59": 109271.49, "60-64": 114478.58, "65-69": 98854.54, "70-75": 88052.63 },
{ job: "Social and related scientists", "<29": 63360, "30-34": 72062.58, "35-39": 75049.1, "40-44": 83116.98, "45-49": 86538.54, "50-54": 91209.49, "55-59": 91326.79, "60-64": 91583.62, "65-69": 91384.97, "70-75": 77650.2 }]

let keys = ["<29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-75"]

// create showData function
function showData(data) {
    // determine scales and axis
    // create x axis
    let xScale = d3.scaleLinear()
        .range([0, fSplotVars.plotWidth])
        .domain([0, d3.max(dataByJob, d => d3.max(keys, k => d[k]))])

    let xAxis = d3.axisTop().scale(xScale)
        .tickFormat(function (d, i) {
            if (i == 0) {
                return "$0"
            } else {
                return d3.format(".2s")(d);
            }
        })

    let xAxisGroup = fSplotContainer.append("g")
        .attr("class", "x-axis-group");

    xAxisGroup.append("g")
        .attr("class", "x-axis")
        .call(xAxis)

    // create x axis label
    fSplotContainer.append("text")
        .attr("transform", `translate(${fSplotVars.plotWidth / 2}, ${-40})`)
        .attr("class", "label")
        .attr("id", "xlabel")
        .style("text-anchor", "middle")
        .text("Female Average Salary ($)")

    // gridlines for x axis function
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks()
    }

    // add the X gridlines
    fSplotContainer.append("g")
        .attr("class", "xgrid")
        .attr("transform", "translate(0," + fSplotVars.plotHeight + ")")
        .call(make_x_gridlines()
            .tickSize(-fSplotVars.plotHeight)
            .tickFormat("")
        )

    // create y axis
    let yScale = d3.scalePoint()
        .domain(data.map(d => d.job).sort(d3.ascending))
        .range([0, fSplotVars.plotHeight])
        .padding(1)

    let yAxis = d3.axisLeft(yScale)
        .tickSize(6)

    let yAxisGroup = fSplotContainer.append("g")
        .attr("class", "y-axis-group")

    let color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSpectral[keys.length])
        .unknown("#ccc")

    let g = fSplotContainer.append("g")
        .attr("text-anchor", "end")
        .style("font", "10px sans-serif")
        .selectAll("g")
        .data(dataByJob)
        .join("g")
        .attr("transform", (d, i) => `translate(0,${yScale(d.job)})`);

    g.append("line")
        .attr("stroke", "#aaa")
        .attr("x1", d => xScale(d3.min(keys, k => d[k])))
        .attr("x2", d => xScale(d3.max(keys, k => d[k])))

    g.append("g")
        .selectAll("circle")
        .data(d => d3.cross(keys, [d]))
        .join("circle")
        .attr("cx", ([k, d]) => xScale(d[k]))
        .attr("fill", ([k]) => color(k))
        .attr("r", 6)

    g.append("text")
        .attr("dy", "0.35em")
        .attr("x", d => xScale(d3.min(keys, k => d[k])) - 10)
        .text((d, i) => d.job)

    // add sorting
    d3.select("#fOrderBy")
        .on("change", function () {
            var attribute = d3.select(this).property("value");
            update(attribute);
        })

    function update(attribute) {
        console.log(attribute);
        const index = d3.range(dataByJob.length);
        const order = attribute === "Job Category" ? d3.ascending : d3.descending;
        index.sort((i, j) => order(data[i][attribute], data[j][attribute]));
        //fSplotContainer.update(d3.permute(data.map(d => d.job), index));
    }
}

function legend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues
} = {}) {

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

    let x;

    // Continuous
    if (color.interpolator) {
        x = Object.assign(color.copy()
            .interpolator(d3.interpolateRound(marginLeft, width - marginRight)), {
            range() {
                return [marginLeft, width - marginRight];
            }
        });

        svg.append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", ramp(color.interpolator()).toDataURL());

        // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
            if (tickValues === undefined) {
                const n = Math.round(ticks + 1);
                tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
            }
            if (typeof tickFormat !== "function") {
                tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
            }
        }
    }

    // Discrete
    else if (color.invertExtent) {
        const thresholds = color.thresholds ? color.thresholds() // scaleQuantize
            :
            color.quantiles ? color.quantiles() // scaleQuantile
                :
                color.domain(); // scaleThreshold

        const thresholdFormat = tickFormat === undefined ? d => d :
            typeof tickFormat === "string" ? d3.format(tickFormat) :
                tickFormat;

        x = d3.scaleLinear()
            .domain([-1, color.range().length - 1])
            .rangeRound([marginLeft, width - marginRight]);

        svg.append("g")
            .selectAll("rect")
            .data(color.range())
            .join("rect")
            .attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", d => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = i => thresholdFormat(thresholds[i], i);
    }

    svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
        .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));

    return svg.node();
}
/*// bind the raw data and show the visualization
let countData = d3.csv("data/count_visual_data.csv", function (d) {
    return {
        job: d.N2OCPRMG,
        gender: d.GENDER,
        count: + d.Count,
        academia: d.ACADEMIA
    }
}).then(showData)
// create plot container and its variables
let countPlotContainer = d3.select("#countPlotContainer")

let countPlotVars = ({
    plotHeight: 400,
    plotWidth: 1000,
})

// create showData function
function showData(data) {
    // filter data based on academic or industry
    let countDisplayData = data.filter(function (d) { return d.academia == "TRUE" })
    //window.addEventListener("load", () => { drawData(countDisplayData); }, false);
    console.log(countDisplayData)
    d3.select("#countAcademic")
        .on("click", function () {
            countData = data.filter(function (d) { return d.academia == "TRUE" });
            console.log(countDisplayData)
            //drawData(countDisplayData);
        })

    d3.select("#countIndustry")
        .on("click", function () {
            countDisplayData = data.filter(function (d) { return d.academia == "FALSE" });
            console.log(countDisplayData)
            //drawData(countDisplayData);
        })
}
*/

var yourVlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
        url: "data/count_visual_data.csv"
    },
    mark: 'bar',
    encoding: {
        x: { field: 'N2OCPRNG', type: 'ordinal' },
        y: { field: 'Count', type: 'quantitative' }
    }
};
vegaEmbed('#vis', yourVlSpec);

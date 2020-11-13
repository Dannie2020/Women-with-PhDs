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

var academicVlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
        url: "data/count_academic_data.csv"
    },
    title: "Academic",
    vconcat: [
        {
            encoding: {
                color: {
                    condition: {
                        selection: "brush",
                        title: "Principal Job Category",
                        field: "Principal Job Category",
                        type: "nominal",
                        scale: {
                            domain: ["Biological, agricultural and other life scientists ", "Computer and mathematical scientists ",
                                "Engineers ", "Non-S&E Occupations ", "Physical and related scientists ", "S&E related occupations ", "Social and related scientists "],
                            range: ["#c0392b", "#2980b9", "#e84393", "#27ae60", "#f1c40f", "#8e44ad", "#34495e"]
                        }
                    },
                    value: "lightgray"
                },
                shape: {
                    title: "Gender",
                    field: "GENDER",
                    type: "nominal",
                },
                size: {
                    title: "Count",
                    field: "Count",
                    scale: { domain: [0, 1000] },
                    type: "quantitative"
                },
                x: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                },
                y: {
                    title: "Count of Participants",
                    field: "Count",
                    type: "quantitative"
                }
            },
            width: 800,
            height: 500,
            mark: { type: "point", tooltip: true },
            selection: { brush: { encodings: ["x"], type: "interval" } },
            transform: [{ filter: { selection: "click" } }]
        },
        {
            encoding: {

                x: { field: "Count", title: "Count of Participants", type: "quantitative", aggregate: "sum" },
                y: { title: "Gender", field: "GENDER" }
            },
            width: 800,
            mark: { type: "bar", tooltip: true },
            selection: { click: { encodings: ["color"], type: "multi" } },
            transform: [{ filter: { selection: "brush" } }]
        },

    ],

};

var industryVlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
        url: "data/count_industry_data.csv"
    },
    title: "Industry",
    vconcat: [
        {
            encoding: {
                color: {
                    condition: {
                        selection: "brush",
                        title: "Principal Job Category",
                        field: "Principal Job Category",
                        type: "nominal",
                        scale: {
                            domain: ["Biological, agricultural and other life scientists ", "Computer and mathematical scientists ",
                                "Engineers ", "Non-S&E Occupations ", "Physical and related scientists ", "S&E related occupations ", "Social and related scientists "],
                            range: ["#c0392b", "#2980b9", "#e84393", "#27ae60", "#f1c40f", "#8e44ad", "#34495e"]
                        }
                    },
                    value: "lightgray"
                },
                shape: {
                    title: "Gender",
                    field: "GENDER",
                    type: "nominal",
                },
                size: {
                    title: "Count",
                    field: "Count",
                    scale: { domain: [0, 1000] },
                    type: "quantitative"
                },
                x: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                },
                y: {
                    title: "Count of Participants",
                    field: "Count",
                    type: "quantitative"
                }
            },
            width: 800,
            height: 500,
            mark: { type: "point", tooltip: true },
            selection: { brush: { encodings: ["x"], type: "interval" } },
            transform: [{ filter: { selection: "click" } }]
        },
        {
            encoding: {

                x: { field: "Count", title: "Count of Participants", type: "quantitative", aggregate: "sum" },
                y: { title: "Gender", field: "GENDER" }
            },
            width: 800,
            mark: { type: "bar", tooltip: true },
            selection: { click: { encodings: ["color"], type: "multi" } },
            transform: [{ filter: { selection: "brush" } }]
        },

    ],

};

vegaEmbed('#academicVis', academicVlSpec);
vegaEmbed('#industryVis', industryVlSpec);


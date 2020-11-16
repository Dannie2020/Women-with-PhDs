var raceVlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
        url: "data/df_s2.csv"
    },
    hconcat: [
        {
            title: "Female",
            transform: [{
                filter: "datum.Gender == 'Female '"
            }],
            encoding: {
                color: {
                    title: "Race/ethinicity",
                    field: "RACETHMP",
                    type: "nominal",
                    scale: {
                        domain: ["White ONLY, non-Hispanic ", "Asian ONLY, non-Hispanic ", "Hispanic, any race ",
                            "Black ONLY, non-Hispanic ", "Other races including multiracial individuals, non-Hispanic "],
                        range: ["#2980b9", "#d35400", "#16a085", "#f1c40f", "#8e44ad"]
                    },
                },
                order: {
                    filed: "RACETHMP",
                    aggregate: "count",
                    sort: "descending"
                },
                opacity: {
                    condition: { selection: "race", value: 1 },
                    value: 0.15
                },
                x: {
                    aggregate: "count",
                },
                y: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                    sort: "-x"
                }
            },
            width: 400,
            height: 300,
            mark: { type: "bar", tooltip: true },
            selection: {
                race: {
                    type: "multi", fields: ["RACETHMP"], bind: "legend"
                }
            }
        },
        {
            title: "Male",
            transform: [{
                filter: "datum.Gender == 'Male '"
            }],
            encoding: {
                color: {
                    title: "Race/ethinicity",
                    field: "RACETHMP",
                    type: "nominal",
                    scale: {
                        domain: ["White ONLY, non-Hispanic ", "Asian ONLY, non-Hispanic ", "Hispanic, any race ",
                            "Black ONLY, non-Hispanic ", "Other races including multiracial individuals, non-Hispanic "],
                        range: ["#2980b9", "#d35400", "#16a085", "#f1c40f", "#8e44ad"]
                    },
                },
                order: {
                    filed: "RACETHMP",
                    aggregate: "count",
                    sort: "descending"
                },
                opacity: {
                    condition: { selection: "race", value: 1 },
                    value: 0.15
                },
                x: {
                    aggregate: "count",
                },
                y: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                    sort: "-x"
                }
            },
            width: 400,
            height: 300,
            mark: { type: "bar", tooltip: true },
            selection: {
                race: {
                    type: "multi", fields: ["RACETHMP"], bind: "legend"
                }
            }
        },

    ],

};

var race2VlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
        url: "data/df_s2.csv"
    },
    hconcat: [
        {
            title: "White ONLY, non-Hispanic",
            transform: [{
                filter: "datum.RACETHMP == 'White ONLY, non-Hispanic '"
            }],
            encoding: {
                color: {
                    title: "Race/ethinicity",
                    field: "RACETHMP",
                    type: "nominal",
                    scale: {
                        domain: ["White ONLY, non-Hispanic ", "Asian ONLY, non-Hispanic ", "Hispanic, any race ",
                            "Black ONLY, non-Hispanic "],
                        range: ["#2980b9", "#d35400", "#16a085", "#f1c40f"]
                    },
                },
                x: {
                    aggregate: "count",
                },
                y: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                    sort: "-x"
                }
            },
            width: 200,
            height: 300,
            mark: { type: "bar", tooltip: true }
        },
        {
            title: "Asian ONLY, non-Hispanic",
            transform: [{
                filter: "datum.RACETHMP == 'Asian ONLY, non-Hispanic '"
            }],
            encoding: {
                color: {
                    title: "Race/ethinicity",
                    field: "RACETHMP",
                    type: "nominal",
                    scale: {
                        domain: ["White ONLY, non-Hispanic ", "Asian ONLY, non-Hispanic ", "Hispanic, any race ",
                            "Black ONLY, non-Hispanic "],
                        range: ["#2980b9", "#d35400", "#16a085", "#f1c40f"]
                    },
                },
                x: {
                    aggregate: "count",
                    scale: { domain: [0, 6000] }
                },
                y: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                    sort: "-x",
                    axis: null
                }
            },
            width: 200,
            height: 300,
            mark: { type: "bar", tooltip: true }
        },

        {
            title: "Hispanic, any race",
            transform: [{
                filter: "datum.RACETHMP == 'Hispanic, any race '"
            }],
            encoding: {
                color: {
                    title: "Race/ethinicity",
                    field: "RACETHMP",
                    type: "nominal",
                    scale: {
                        domain: ["White ONLY, non-Hispanic ", "Asian ONLY, non-Hispanic ", "Hispanic, any race ",
                            "Black ONLY, non-Hispanic "],
                        range: ["#2980b9", "#d35400", "#16a085", "#f1c40f"]
                    },
                },
                x: {
                    aggregate: "count",
                    scale: { domain: [0, 6000] }
                },
                y: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                    sort: "-x",
                    axis: null
                }
            },
            width: 200,
            height: 300,
            mark: { type: "bar", tooltip: true }
        },

        {
            title: "Black ONLY, non-Hispanic",
            transform: [{
                filter: "datum.RACETHMP == 'Black ONLY, non-Hispanic '"
            }],
            encoding: {
                color: {
                    title: "Race/ethinicity",
                    field: "RACETHMP",
                    type: "nominal",
                    scale: {
                        domain: ["White ONLY, non-Hispanic ", "Asian ONLY, non-Hispanic ", "Hispanic, any race ",
                            "Black ONLY, non-Hispanic "],
                        range: ["#2980b9", "#d35400", "#16a085", "#f1c40f"]
                    },
                },
                x: {
                    aggregate: "count",
                    scale: { domain: [0, 6000] }
                },
                y: {
                    field: "AGEGRP",
                    type: "ordinal",
                    title: "Age Group",
                    sort: "-x",
                    axis: null
                }
            },
            width: 200,
            height: 300,
            mark: { type: "bar", tooltip: true }
        },
    ],

};

var weekVlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    vconcat: [
        {
            data: {
                url: "data/df_s2.csv"
            },
            transform: [{
                filter: "datum.HRSWKP == 'Greater than 40 ' && datum.WKSYR == 'Work 52 weeks per year '"
            }],
            encoding: {
                color: {
                    field: "Gender",
                    type: "nominal",
                    scale: {
                        domain: ["Female ", "Male "],
                        range: ["#e8505b", "#16a596"]
                    },
                },
                column: {
                    field: "AGEGRP", type: "ordinal", spacing: 10,
                    title: "Age Group",
                },
                x: {
                    field: "Gender",
                    type: "nominal",
                    axis: null
                },
                y: {
                    aggregate: "count",
                }
            },
            width: { "step": 36 },
            height: 300,
            mark: { type: "bar", tooltip: true },
        },
        {
            data: {
                url: "data/workalot_percent@1.csv"
            },
            encoding: {
                color: {
                    field: "Gender",
                    type: "nominal",
                    scale: {
                        domain: ["Female ", "Male "],
                        range: ["#e8505b", "#16a596"]
                    },
                },
                column: {
                    field: "AGEGRP", type: "ordinal", spacing: 10,
                    title: "",
                },
                x: {
                    field: "Gender",
                    type: "nominal",
                    axis: { title: "" }
                },
                y: {
                    field: "Percentage",
                    type: "quantitative",
                }
            },
            width: { "step": 36 },
            height: 280,
            mark: { type: "bar", tooltip: true },
        }
    ]
};

vegaEmbed('#raceVis', raceVlSpec);
vegaEmbed('#race2Vis', race2VlSpec);
vegaEmbed('#weekVis', weekVlSpec);
// Function to fetch JSON files
async function fetchJSONFiles(fileNames) {
    const jsonPromises = fileNames.map(fileName => fetch(fileName).then(res => res.json()));
    return Promise.all(jsonPromises);
}

// Specify the JSON file names
const fileNames = ['allDocuments01.json', 'allDocuments02.json', 'allDocuments03.json'];

// Initialize summary object
const summary = {
    totalTimeSpent: 0,
    resourcesPerCategory: {},
    bookmarks: 0,
    likes: 0,
    dislikes: 0,
    deletedItems: 0,
    cuetags: new Set()
};

// Function to aggregate data
function aggregateData(allData) {
    allData.forEach(dataObject => {
        const data = dataObject.data;

        if (Array.isArray(data)) {
            data.forEach(record => {
                const siteInfo = record.data.siteInfo;
                summary.totalTimeSpent += siteInfo.timeActive;

                if (siteInfo.categoryName in summary.resourcesPerCategory) {
                    summary.resourcesPerCategory[siteInfo.categoryName]++;
                } else {
                    summary.resourcesPerCategory[siteInfo.categoryName] = 1;
                }

                if (siteInfo.isExactBookmark) summary.bookmarks++;
                if (siteInfo.like) summary.likes++;
                if (siteInfo.dislike) summary.dislikes++;
                if (siteInfo.psuedoDeleteFlag) summary.deletedItems++;

                if (Array.isArray(siteInfo.qtag)) {
                    siteInfo.qtag.forEach(tag => summary.cuetags.add(tag));
                } else {
                    summary.cuetags.add(siteInfo.qtag);
                }
            });
        } else {
            console.error("Data is not an array:", dataObject);
        }
    });

    summary.cuetags = summary.cuetags.size;
}

// Function to render Vega-Lite charts
function renderCharts() {
    // Helper function to add text labels to bars
    function addTextLabels(spec) {
        return {
            ...spec,
            "layer": [
                spec,
                {
                    "mark": "text",
                    "encoding": {
                        "text": { "field": "value", "type": "quantitative" },
                        "x": { "field": "category", "type": "nominal" },
                        "y": { "field": "value", "type": "quantitative" },
                        "color": { "value": "black" }
                    },
                    "config": {
                        "text": { "align": "center", "baseline": "middle" }
                    }
                }
            ]
        };
    }

    // Total time spent chart
    const timeSpentSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": {
            "values": [{ "measure": "Total Time Spent", "value": summary.totalTimeSpent }]
        },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "measure", 
                "type": "nominal",
                "axis": {
                    "labelAngle": -45,
                    "title": ""
                }
            },
            "y": {
                "field": "value", 
                "type": "quantitative",
                "axis": {
                    "title": "Value"
                }
            },
            "tooltip": [
            {"field": "measure", "type": "nominal", "title": "Measure"},
            {"field": "value", "type": "quantitative", "title": "Value"}
            ]
        },
        "width": 100,  // Set the width of the chart
        "height": 300  // Set the height of the chart
    };

    vegaEmbed('#timeSpent', addTextLabels(timeSpentSpec));

    // Resources per category chart
    const resourcesSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": {
            "values": Object.entries(summary.resourcesPerCategory).map(([category, count]) => ({ category, count }))
        },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "category", 
                "type": "nominal",
                "axis": {
                    "labelAngle": -45,
                    "title": "Category"
                }
            },
            "y": {
                "field": "count", 
                "type": "quantitative",
                "axis": {
                    "title": "Count"
                }
            },
            "tooltip": [
            {"field": "category", "type": "nominal", "title": "Category"},
            {"field": "count", "type": "quantitative", "title": "Count"}
        ]
        },
        "width": 400,  // Set the width of the chart
        "height": 300  // Set the height of the chart
    };

    vegaEmbed('#resourcesPerCategory', addTextLabels(resourcesSpec));

    // Bookmarks, likes, dislikes, deleted items, and cuetags chart
    const otherMetrics = [
        { measure: "Bookmarks", value: summary.bookmarks },
        { measure: "Likes", value: summary.likes },
        { measure: "Dislikes", value: summary.dislikes },
        { measure: "Deleted Items", value: summary.deletedItems },
        { measure: "Cuetags", value: summary.cuetags }
    ];

    const otherMetricsSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": { "values": otherMetrics },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "measure", 
                "type": "nominal",
                "axis": {
                    "labelAngle": -45,
                    "title": "Tools"
                }
            },
            "y": {
                "field": "value", 
                "type": "quantitative",
                "axis": {
                    "title": "Value"
                }
            },
            "tooltip": [
            {"field": "measure", "type": "nominal", "title": "Measure"},
            {"field": "value", "type": "quantitative", "title": "Value"}
        ]
        },
        "width": 400, 
        "height": 300  
    };

    vegaEmbed('#otherMetrics', addTextLabels(otherMetricsSpec));
}

// Fetch data and render charts
fetchJSONFiles(fileNames).then(allData => {
    console.log("Fetched data:", allData); // Debugging: Log the fetched data
    aggregateData(allData);
    renderCharts();
}).catch(error => {
    console.error("Error fetching or processing data:", error);
});

fetch('someDocuments.json')
  .then(response => response.json())
  .then(jsonData => {
    const data = jsonData.data; // access data array in JSON file

    const categories = [
      "articles", "lectures_and_demos", "step_by_step_tutorials",
      "discussion_forum_helpseeking", "ai_help", "my_work"
    ];

    // Initialize an object to store number of links in each category
    const categoryStats = {};

    for (let i = 0; i < categories.length; i++) {
      categoryStats[categories[i]] = {
        numberOfLinks: 0
      };
    }

    // Calculate number of links for each category
    for (let i = 0; i < data.length; i++) {
      const category = data[i].data.siteInfo.categoryName;
      if (categories.includes(category)) {
        categoryStats[category].numberOfLinks++;
      }
    }

    // Process data to fit Vega-Lite format for bar chart
    const processedData = categories.map(category => {
      return {
        "category": category,
        "bubbleSize": categoryStats[category].numberOfLinks // Bubble size based on number of links
      };
    });

    // Define color mapping for categories
    const colorMapping = {
      "articles": "#ecc5b7",
      "lectures_and_demos": "#d7947d",
      "step_by_step_tutorials": "#b97763",
      "discussion_forum_helpseeking": "#7eaba6",
      "ai_help": "#5abba7",
      "my_work": "#6ad6e7"
    };

    // Vega-Lite specification for bar chart
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Bar chart showing number of links per category",
      "width": 800,
      "height": 400,
      "data": { "values": processedData },  // Use processedData after fetching
      "mark": "bar",  // Use bars for the chart
      "encoding": {
        "x": { "field": "category", "type": "nominal", "axis": { "title": "Categories" } },  // X-axis as categories
        "y": { "field": "bubbleSize", "type": "quantitative", "axis": { "title": "Number of Links" } },  // Y-axis as number of links
        "color": {
          "field": "category",
          "type": "nominal",
          "scale": {
            "domain": categories,
            "range": Object.values(colorMapping)  // Use colors from colorMapping object
          },
          "legend": null  // Disable legend for color encoding
        }
      }
    };

    // Embed the visualization in the div with id 'vis-bar'
    vegaEmbed('#vis', spec).catch(console.error);
  })
  .catch(error => console.error('Error fetching JSON:', error));

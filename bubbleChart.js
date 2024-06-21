fetch('someDocuments.json')
  .then(response => response.json())
  .then(jsonData => {
    const data = jsonData.data; // access data array in JSON file

    const categories = [
      "articles", "lectures_and_demos", "step_by_step_tutorials",
      "discussion_forum_helpseeking", "ai_help", "my_work"
    ];

    // Initialize an object to store time spent and number of links in each category
    const categoryStats = {};

    for (let i = 0; i < categories.length; i++) {
      categoryStats[categories[i]] = {
        timeActive: 0,
        numberOfLinks: 0
      };
    }

    // Calculate total time spent and number of links for each category
    for (let i = 0; i < data.length; i++) {
      const category = data[i].data.siteInfo.categoryName;
      const timeSpent = data[i].data.siteInfo.timeActive || 0;
      if (categories.includes(category)) {
        categoryStats[category].timeActive += timeSpent;
        categoryStats[category].numberOfLinks++;
      }
    }

    // Process data to fit Vega-Lite format
    const processedData = categories.map(category => {
      const { timeActive, numberOfLinks } = categoryStats[category];

      return {
        "xField": category,
        "yField": timeActive,  // Y-axis as time spent in seconds
        "bubbleSize": numberOfLinks, // Bubble size based on number of links
        "category": category  // Corrected field name to "category"
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

    // Vega-Lite specification for bubble plot
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Bubble plot showing study categories, their time spent and number of links",
      "width": 800,
      "height": 600,
      "data": { "values": processedData },  // Use processedData after fetching
      "mark": "circle",  // Use circles for bubbles
      "encoding": {
        "x": { "field": "xField", "type": "nominal", "axis": { "title": "Categories" } },  // X-axis as categories
        "y": { "field": "yField", "type": "quantitative", "axis": { "title": "Time Spent (seconds)" } },  // Y-axis as time spent
        "size": { "field": "bubbleSize", "type": "quantitative", "legend": { "title": "Number of Links" } },  // Bubble size based on number of links
        "color": {
          "field": "category",
          "type": "nominal",
          "scale": {
            "domain": categories,
            "range": Object.values(colorMapping)  // Use colors from colorMapping object
          },
          "legend": null  // Disable legend for color encoding
        },
        "tooltip": [
          { "field": "xField", "type": "nominal", "title": "Category Name" },
          { "field": "yField", "type": "quantitative", "title": "Time Spent (s)"},
          { "field": "bubbleSize", "type": "quantitative", "title": "Number of Links" }
        ]
      }
    };

    // Embed the visualization in the div with id 'vis'
    vegaEmbed('#vis', spec).catch(console.error);
  })
  .catch(error => console.error('Error fetching JSON:', error));

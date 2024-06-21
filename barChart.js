fetch('someDocuments.json')
  .then(response => response.json())
  .then(jsonData => {
    const data = jsonData.data; // access data array in JSON file

    const categories = [
      "articles", "uncategorized", "lectures_and_demos",
      "step_by_step_tutorials", "discussion_forum_helpseeking",
      "ai_help", "my_work"
    ];

    // Function to calculate number of links per category
    const calculateLinksPerCategory = (data, categories) => {
      const linksCount = {};
      categories.forEach(cat => linksCount[cat] = 0);

      for (let i = 0; i < data.length - 1; i++) {
        const fromCategory = data[i].data.siteInfo.categoryName;
        const toCategory = data[i + 1].data.siteInfo.categoryName;

        if (categories.includes(fromCategory) && categories.includes(toCategory)) {
          linksCount[fromCategory]++;
        }
      }

      return categories.map(cat => ({ category: cat, links: linksCount[cat] }));
    };

    const linksPerCategory = calculateLinksPerCategory(data, categories);

    // Vega-Lite specification
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Bubble plot that shows study categories, their like-to-dislike ratios, and the total time spent",
      "width": 800,
      "height": 600,
      "data": { "values": linksPerCategory }, // Use processed data with links per category
      "mark": "bar", // Use bars to represent categories based on link count
      "encoding": {
        "x": { "field": "category", "type": "ordinal", "axis": { "title": "Categories" } }, // X-axis as categories
        "y": { "field": "links", "type": "quantitative", "axis": { "title": "Number of Links" } } // Y-axis as number of links
      }
    };

    // Embed the visualization in the div with id 'vis'
    vegaEmbed('#vis', spec).catch(console.error);
  })
  .catch(error => console.error('Error fetching JSON:', error));

fetch('someDocuments.json')  // Fetch the JSON data
    .then(response => response.json())
    .then(jsonData => {
        const data = jsonData.data; // access data array in JSON file

        const categories = [
          "articles", "uncategorized", "lectures_and_demos", "step_by_step_tutorials",
          "discussion_forum_helpseeking", "ai_help", "my_work"
        ];

        // Initialize an object to store time spent and like/dislike counts in each category
        const categoryStats = {};

        categories.forEach(category => {
          categoryStats[category] = {
            totalTime: 0,
            likeCount: 0,
            neutralCount: 0,
            dislikeCount: 0
          };
        });

        // Calculate total time spent, like count, neutral count, and dislike count for each category
        data.forEach(entry => {
          const category = entry.data.siteInfo.categoryName;
          const timeSpent = entry.data.siteInfo.totalTime || 0;  // Default to 0 if totalTime is undefined
          categoryStats[category].totalTime += timeSpent;
          if (entry.data.siteInfo.like) {
            categoryStats[category].likeCount++;
          } else if (entry.data.siteInfo.dislike) {
            categoryStats[category].dislikeCount++;
          } else {
            categoryStats[category].neutralCount++;
          }
        });

        // Process data to fit Vega-Lite format
        const processedData = categories.map(category => {
          const { totalTime, likeCount, neutralCount, dislikeCount } = categoryStats[category];
          // Calculate like-to-dislike ratio including neutral links and adjust for positive values
          console.log(category, "- like count: ", likeCount, ", dislike count: ", dislikeCount, ", neutral count: ", neutralCount);
          const likeToDislikeRatio = ((likeCount - dislikeCount) / (likeCount + neutralCount + dislikeCount)) + 1;
          return {
            "xField": category,
            "yField": likeToDislikeRatio,  
            "bubbleSize": totalTime,
          };
        });


        // Vega-Lite specification
        const spec = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "description": "Bubble plot that shows study categories, their like-to-dislike ratios, and the total time spent",
          "width": 800,
          "height": 600,
          "data": { "values": processedData },  // Use processedData after fetching
          "mark": "circle",  // Use circles for bubbles
          "encoding": {
            "x": { "field": "xField", "type": "nominal", "axis": { "title": "Categories" } },  // X-axis as categories
            "y": { "field": "yField", "type": "quantitative", "axis": { "title": "Adjusted Like-to-Dislike Ratio" } },  // Y-axis as quantitative ratio
            "size": { "field": "bubbleSize", "type": "quantitative", "scale": { "type": "linear", "zero": true } }  // Bubble size based on time spent
          }
        };

        // Embed the visualization in the div with id 'vis'
        vegaEmbed('#vis', spec)
          .catch(console.error);
      })
      .catch(error => console.error('Error fetching JSON:', error));

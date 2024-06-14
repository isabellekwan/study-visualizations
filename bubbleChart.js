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

        for (let i = 0; i < categories.length; i++) {
            categoryStats[categories[i]] = {
              timeActive: 0,
              likeCount: 0,
              neutralCount: 0,
              dislikeCount: 0
            };
          }

        // Calculate total time spent, like count, neutral count, and dislike count for each category
        for (let i = 0; i < data.length; i++) {
            const category = data[i].data.siteInfo.categoryName;
            const timeSpent = data[i].data.siteInfo.timeActive || 0;
            categoryStats[category].timeActive += timeSpent;
      
            if (data[i].data.siteInfo.like) {
              categoryStats[category].likeCount++;
            } else if (data[i].data.siteInfo.dislike) {
              categoryStats[category].dislikeCount++;
            } else {
              categoryStats[category].neutralCount++;
            }
        }

        // Process data to fit Vega-Lite format
        const processedData = categories.map(category => {
          const { timeActive, likeCount, neutralCount, dislikeCount } = categoryStats[category];
          // Calculate like-to-dislike ratio including neutral links and adjust for positive values
          console.log(category, " - like count: ", likeCount, ", dislike count: ", dislikeCount, ", neutral count: ", neutralCount);
          const likeToDislikeRatio = ((likeCount - dislikeCount) / (likeCount + neutralCount + dislikeCount)) + 1;
          return {
            "xField": category,
            "yField": likeToDislikeRatio,  
            "bubbleSize": timeActive,
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
            "y": { "field": "yField", "type": "quantitative", "axis": { "title": "Dislike to Like Ratio (0-2)" } },  // Y-axis as quantitative ratio
            "size": { "field": "bubbleSize", "type": "quantitative", "legend": { "title": "Time Spent (in seconds)" }, "scale": { "type": "linear", "zero": true } }  // Bubble size based on time spent
          }
        };

        // Embed the visualization in the div with id 'vis'
        vegaEmbed('#vis', spec).catch(console.error);
      })
      .catch(error => console.error('Error fetching JSON:', error));

fetch('userData/allDocuments01.json')  // Fetch the JSON data
      .then(response => response.json())
      .then(jsonData => {
        const data = jsonData.data; // access data array in JSON file

        const categories = [
          "articles", "lectures_and_demos", "step_by_step_tutorials",
          "discussion_forum_helpseeking", "ai_help", "my_work"
        ];

        let transitions = {};

        // Initialize transition counts
        categories.forEach(from => {
          transitions[from] = {};
          categories.forEach(to => {
            transitions[from][to] = 0;
          });
        });

        // Calculate transitions to and from categories
        for (let i = 0; i < data.length - 1; i++) {
            const fromCategory = data[i].data.siteInfo.categoryName;
            const toCategory = data[i + 1].data.siteInfo.categoryName;
            if (categories.includes(fromCategory) && categories.includes(toCategory)) {
                transitions[fromCategory][toCategory] += 1;
                console.log("added a transition from ",fromCategory, " to ", toCategory );
            }
        }

        const links = []; // each element has a source, target, and value

        for (const [fromCategory, targets] of Object.entries(transitions)) {
          for (const [toCategory, count] of Object.entries(targets)) {
            if (count > 0 && fromCategory !== "uncategorized" && toCategory !== "uncategorized") {
              links.push({ "source": fromCategory, "target": toCategory, "value": count });
            }
          }
        }

        const graphData = {
          "nodes": categories.map(name => ({ "name": name, "label": name })),
          "links": links
        };

        const spec = {
          "$schema": "https://vega.github.io/schema/vega/v5.json",
          "description": "An arc diagram example that represents the movement from different categories",
          "width": 800,
          "height": 400,
          "padding": 5,
          "data": [
            {
              "name": "nodes",
              "values": graphData.nodes
            },
            {
              "name": "links",
              "values": graphData.links
            }
          ],
          "scales": [
            {
              "name": "x",
              "type": "point",
              "range": "width",
              "domain": {"data": "nodes", "field": "name"}
            },
            {
              "name": "linkWidth",
              "type": "linear",
              "range": [1, 15],
              "domain": {"data": "links", "field": "value"},
              "zero": true, 
              "nice": true
            },
            {
              "name": "color",
              "type": "ordinal",
              "domain": ["articles", "lectures_and_demos", "step_by_step_tutorials", "discussion_forum_helpseeking", "ai_help", "my_work"],
              "range": ["#ecc5b7", "#d7947d", "#b97763", "#7eaba6", "#5abba7", "#6ad6e7"]  
            }
          ],
          "marks": [
            {
              "type": "path",
              "from": {"data": "links"},
              "encode": {
                "enter": {
                  "path": {
                    "signal": "datum.source && datum.target ? 'M' + scale('x', datum.source) + ',200A150,150 0 0,1 ' + scale('x', datum.target) + ',200' : null"
                  },
                  "stroke": {"scale": "color", "field": "source"},
                  "strokeWidth": {"scale": "linkWidth", "field": "value"},
                  "order": {"value": 1}
                }
              }
            },
            {
              "type": "symbol",
              "from": {"data": "nodes"},
              "encode": {
                "enter": {
                  "x": {"scale": "x", "field": "name"},
                  "y": {"value": 200},
                  "size": {"value": 300},
                  "fill": {"scale": "color", "field": "name"},
                  "order": {"value": 2}
                }
              }
            },
            {
              "type": "text",
              "from": {"data": "nodes"},
              "encode": {
                "enter": {
                  "x": {"scale": "x", "field": "name"},
                  "y": {"value": 240},
                  "align": {"value": "center"},
                  "baseline": {"value": "middle"},
                  "text": {"field": "label"},
                  "fontSize": {"value": 12},
                  "fontWeight": {"value": "normal"},
                  "fill": {"value": "black"},
                  "angle": {"signal": "-45"},
                  "order": {"value": 3} 
                }
              }
            }
          ]
        };
        vegaEmbed('#vis', spec).catch(console.error);
      })
      .catch(error => console.error('Error fetching JSON:', error));

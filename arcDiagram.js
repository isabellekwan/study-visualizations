fetch('someDocuments.json')  // Fetch the JSON data
      .then(response => response.json())
      .then(jsonData => {
        const data = jsonData.data; // access data array in JSON file

        const categories = [
          "articles", "uncategorized", "lectures_and_demos", "step_by_step_tutorials",
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
            if (count > 0) {
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
              "range": [1, 10],
              "domain": {"data": "links", "field": "value"}
            }
          ],
          "marks": [
            {
              "type": "symbol",
              "from": {"data": "nodes"},
              "encode": {
                "enter": {
                  "x": {"scale": "x", "field": "name"},
                  "y": {"value": 200},
                  "size": {"signal": "datum.name === datum.name ? (datum.name === datum.name ? 2 : 1.5) * 100 : 100"},
                  "fill": {"value": "steelblue"}
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
                "angle": {
                "signal": "-45"
                }
            }
            }
            },
            {
                "type": "path",
                "from": {"data": "links"},
                "encode": {
                "enter": {
                  "path": {
                    "signal": "datum.source && datum.target ? 'M' + scale('x', datum.source) + ',200A150,150 0 0,1 ' + scale('x', datum.target) + ',200' : null"
                    },
                    "stroke": {"value": "rgba(70, 130, 180, 0.7)"},
                  "strokeWidth": {"scale": "linkWidth", "field": "value"}
                }
              }
            }
          ]
        };

        vegaEmbed('#vis', spec).catch(console.error);
      })
      .catch(error => console.error('Error fetching JSON:', error));
fetch('someDocuments.json')  // Fetch the JSON data
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
      if (categories.includes(fromCategory) && categories.includes(toCategory) && fromCategory !== "uncategorized" && toCategory !== "uncategorized") {
        transitions[fromCategory][toCategory] += 1;
        console.log("added a transition from ", fromCategory, " to ", toCategory);
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
      "signals": [
        {
          "name": "hoverNode",
          "value": null,
          "on": [
            {"events": "symbol:mouseover", "update": "datum"},
            {"events": "symbol:mouseout", "update": "null"}
          ]
        },
        {
          "name": "hoverPath",
          "value": null,
          "on": [
            {"events": "path:mouseover", "update": "datum"},
            {"events": "path:mouseout", "update": "null"}
          ]
        }
      ],
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
          "domain": categories,
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
                "signal": `
                  datum.source && datum.target ?
                  'M' + scale('x', datum.source) + ',150' +
                  'A150,150 0 0,1 ' + scale('x', datum.target) + ',150' :
                  null`
              },
              "stroke": {"scale": "color", "field": "source"},
              "strokeWidth": {"scale": "linkWidth", "field": "value"},
              "opacity": {"value": 0.7},
              "order": {"value": 1}
            },
            "update": {
              "strokeOpacity": [
                {"test": "hoverNode && (hoverNode.name === datum.source || hoverNode.name === datum.target)", "value": 1},
                {"value": 0.6}
              ],
              "tooltip": [
                {"test": "hoverNode && (hoverNode.name === datum.source || hoverNode.name === datum.target)", "signal": "{'Start': datum.source, 'End': datum.target, 'Count': datum.value}"}
              ]
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "nodes"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "name"},
              "y": {"value": 150},
              "size": {"value": 300},
              "fill": {"scale": "color", "field": "name"},
              "tooltip": {"signal": "datum.label"},
              "order": {"value": 2}
            },
            "update": {
              "fillOpacity": [
                {"test": "hoverNode && hoverNode.name === datum.name", "value": 1},
                {"value": 0.7}
              ]
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "nodes"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "name"},
              "y": {"value": 190},
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

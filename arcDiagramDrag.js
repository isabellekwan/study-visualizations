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
          "name": "draggedNode",
          "value": null,
          "on": [
            {"events": "symbol:mousedown", "update": "datum"},
            {"events": "symbol:mouseup", "update": "null"}
          ]
        },
        {
          "name": "draggedX",
          "value": 0,
          "on": [
            {"events": "symbol:mousedown", "update": "x()"},
            {"events": "window:mousemove", "update": "draggedNode ? clamp(x(), 0, width) : draggedX"}
          ]
        },
        {
          "name": "draggedY",
          "value": 0,
          "on": [
            {"events": "symbol:mousedown", "update": "y()"},
            {"events": "window:mousemove", "update": "draggedNode ? clamp(y(), 0, height) : draggedY"}
          ]
        },
        {
          "name": "hover",
          "value": null,
          "on": [
            {"events": "symbol:mouseover", "update": "datum"},
            {"events": "symbol:mouseout", "update": "null"}
          ]
        }
      ],
      "data": [
        {
          "name": "nodes",
          "values": graphData.nodes,
          "transform": [
            {
              "type": "formula",
              "expr": "draggedNode && draggedNode.name === datum.name ? draggedX : scale('x', datum.name)",
              "as": "fx"
            },
            {
              "type": "formula",
              "expr": "draggedNode && draggedNode.name === datum.name ? draggedY : 200",
              "as": "fy"
            }
          ]
        },
        {
          "name": "links",
          "values": graphData.links,
          "transform": [
            {
              "type": "lookup",
              "from": "nodes",
              "key": "name",
              "fields": ["source", "target"],
              "values": ["fx", "fy"]
            }
          ]
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
                  'M' + datum.source.fx + ',' + datum.source.fy +
                  'A150,150 0 0,1 ' + datum.target.fx + ',' + datum.target.fy :
                  null`
              },
              "stroke": {"scale": "color", "field": "source"},
              "strokeWidth": {"scale": "linkWidth", "field": "value"},
              "opacity": {"value": 0.7},
              "order": {"value": 1}
            },
            "update": {
              "strokeOpacity": [
                {"test": "hover && (hover.name === datum.source || hover.name === datum.target)", "value": 1},
                {"value": 0.7}
              ]
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "nodes"},
          "encode": {
            "enter": {
              "x": {"field": "fx"},
              "y": {"field": "fy"},
              "size": {"value": 300},
              "fill": {"scale": "color", "field": "name"},
              "tooltip": {"signal": "datum.label"},
              "order": {"value": 2}
            },
            "update": {
              "fillOpacity": [
                {"test": "hover && hover.name === datum.name", "value": 1},
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
              "x": {"field": "fx"},
              "y": {"signal": "datum.fy + 40"},
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

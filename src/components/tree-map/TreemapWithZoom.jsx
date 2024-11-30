import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const TreemapWithZoom = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 800;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // Clear previous render

    const g = svg.append("g");

    // Create hierarchy and treemap
    const root = d3
      .hierarchy(data)
      .sum((d) => d.size || 1)
      .sort((a, b) => b.value - a.value);

    const treemap = d3.treemap().size([width, height]).paddingInner(2);
    treemap(root);

    // Define color scales
    const color = d3.scaleOrdinal().range(["#ffcc80", "#81c784", "#64b5f6"]);

    const draw = (node) => {
      const nodes = g
        .selectAll("g")
        .data(node.leaves())
        .join("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      // Draw rectangles
      nodes
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => color(d.ancestors().length))
        .attr("stroke", "#fff")
        .on("click", (event, d) => zoom(d)); // Attach zoom on click

      // Add text
      nodes
        .append("text")
        .attr("x", 5)
        .attr("y", 15)
        .text((d) => d.data.name)
        .style("font-size", "12px")
        .style("pointer-events", "none");
    };

    const zoom = (d) => {
      const xScale = d3.scaleLinear().domain([d.x0, d.x1]).range([0, width]);
      const yScale = d3.scaleLinear().domain([d.y0, d.y1]).range([0, height]);

      g.transition()
        .duration(750)
        .attr("transform", `translate(${-xScale(d.x0)}, ${-yScale(d.y0)}) scale(${width / (d.x1 - d.x0)}, ${height / (d.y1 - d.y0)})`);

      draw(d);
    };

    // Initial draw
    draw(root);

    // Add zoom and pan
    svg.call(
      d3
        .zoom()
        .scaleExtent([1, 5])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", (event) => g.attr("transform", event.transform))
    );
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default TreemapWithZoom;

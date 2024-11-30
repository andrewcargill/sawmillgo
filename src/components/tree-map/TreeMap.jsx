import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Treemap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 800;
    const height = 600;

    const root = d3
      .hierarchy(data)
      .sum((d) => d.size || 1) // Use the "size" field to determine partition size
      .sort((a, b) => b.value - a.value);

    const treemap = d3.treemap().size([width, height]).padding(1);
    treemap(root);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // Clear previous render

    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => (d.children ? "#69b3a2" : "#d4a373"))
      .attr("stroke", "#fff");

    nodes
      .append("text")
      .attr("x", 5)
      .attr("y", 15)
      .text((d) => d.data.name)
      .attr("fill", "black")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    // Tooltip (Optional)
    nodes
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.data.name}</strong><br>Size: ${d.value}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY + 5}px`);
      })
      .on("mouseout", () => d3.select("#tooltip").style("opacity", 0));
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        style={{
          position: "absolute",
          opacity: 0,
          background: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "5px",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};

export default Treemap;

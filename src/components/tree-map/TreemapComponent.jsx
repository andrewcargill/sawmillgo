import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const TreemapComponent = ({ data, onNodeClick }) => {
    const svgRef = useRef();
  
    useEffect(() => {
      if (!data) return;
  
      const width = 800;
      const treeHeight = 120; // Fixed height for each tree
      const padding = 5;
      const totalHeight = data.children.length * (treeHeight + padding);
  
      const svg = d3.select(svgRef.current).attr("width", width).attr("height", totalHeight);
      svg.selectAll("*").remove();
  
      const colors = {
        tree: "#e0e0e0",
        log: "#ffa500",
        plank: "#6b8e23",
      };
  
      data.children.forEach((tree, treeIndex) => {
        const treeGroup = svg
          .append("g")
          .attr("transform", `translate(0, ${treeIndex * (treeHeight + padding)})`);
  
        treeGroup
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", treeHeight)
          .attr("fill", colors.tree)
          .attr("stroke", "#fff")
          .on("click", () => onNodeClick("tree", tree));
  
        treeGroup
          .append("text")
          .attr("x", 15)
          .attr("y", 20)
          .text(tree.name)
          .attr("fill", "black")
          .style("font-size", "14px");
  
        const logTreemap = d3
          .treemap()
          .size([width - 20, treeHeight - 40])
          .paddingInner(5);
  
        const logRoot = d3.hierarchy(tree).sum((d) => d.size || 1);
        logTreemap(logRoot);
  
        treeGroup
          .selectAll("g.log")
          .data(logRoot.children || [])
          .join("g")
          .attr("class", "log")
          .attr("transform", (d) => `translate(${d.x0 + 10},${d.y0 + 30})`)
          .each(function (d) {
            const logGroup = d3.select(this);
  
            logGroup
              .append("rect")
              .attr("width", d.x1 - d.x0)
              .attr("height", d.y1 - d.y0)
              .attr("fill", colors.log)
              .attr("stroke", "#fff")
              .on("click", () => onNodeClick("log", d.data));
  
            logGroup
              .append("text")
              .attr("x", 5)
              .attr("y", 15)
              .text(d.data.name)
              .attr("fill", "white")
              .style("font-size", "12px");
  
            const plankTreemap = d3
              .treemap()
              .size([d.x1 - d.x0 - 10, Math.max(d.y1 - d.y0 - 30, 10)])
              .paddingInner(2);
  
            const plankRoot = d3.hierarchy(d.data).sum((d) => d.size || 1);
            plankTreemap(plankRoot);
  
            logGroup
              .selectAll("g.plank")
              .data(plankRoot.children || [])
              .join("g")
              .attr("class", "plank")
              .attr("transform", (p) => `translate(${p.x0 + 5},${p.y0 + 30})`)
              .each(function (p) {
                const plankGroup = d3.select(this);
  
                plankGroup
                  .append("rect")
                  .attr("width", p.x1 - p.x0)
                  .attr("height", p.y1 - p.y0)
                  .attr("fill", colors.plank)
                  .attr("stroke", "#fff")
                  .on("click", () => onNodeClick("plank", p.data));
  
                plankGroup
                  .append("text")
                  .attr("x", 5)
                  .attr("y", 12)
                  .text(p.data.name)
                  .attr("fill", "black")
                  .style("font-size", "10px");
              });
          });
      });
    }, [data, onNodeClick]);
  
    return <svg ref={svgRef}></svg>;
  };

export default TreemapComponent;

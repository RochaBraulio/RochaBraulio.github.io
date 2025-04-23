
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

// Sample dataset for the line chart (Year vs Value)
const data = [
  { date: new Date(2015, 0, 1), value: 38 },
  { date: new Date(2016, 0, 1), value: 43 },
  { date: new Date(2017, 0, 1), value: 49 },
  { date: new Date(2018, 0, 1), value: 58 },
  { date: new Date(2019, 0, 1), value: 51 },
  { date: new Date(2020, 0, 1), value: 63 },
  { date: new Date(2021, 0, 1), value: 72 },
];

interface LineChartDemoProps {
  width?: number;
  height?: number;
}

export const LineChartDemo: React.FC<LineChartDemoProps> = ({ width = 560, height = 320 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only set mounted after initial render to ensure SSR compatibility
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !svgRef.current) return;

    // Clear any existing content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Create the main group for margins
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw the x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(width < 400 ? 4 : 7))
      .attr("font-size", "12px");

    // Draw the y-axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .attr("font-size", "12px");

    // Draw the line
    const line = d3.line<{ date: Date; value: number }>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Add points
    g.selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.value))
      .attr("r", 4)
      .attr("fill", "#38bdf8")
      .attr("stroke", "#0ea5e9")
      .attr("stroke-width", 1.5)
      .append("title")
      .text(d => `${d.date.getFullYear()}: ${d.value}`);

    // Add labels to axes
    g.append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 35)
      .attr("fill", "currentColor")
      .text("Year");

    g.append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -35)
      .attr("fill", "currentColor")
      .text("Value");

    // Add a chart title
    svg.append("text")
      .attr("class", "chart-title")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 15)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "currentColor")
      .text("Annual Data Trend");

    console.log("LineChart D3 render complete");
  }, [width, height, isMounted]);

  return (
    <div className="my-8 w-full overflow-x-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <svg 
          ref={svgRef} 
          width={width} 
          height={height} 
          style={{ 
            maxWidth: "100%", 
            height: "auto",
            overflow: "visible"
          }}
          className="mx-auto" 
        />
        <div className="text-xs text-center mt-2 text-slate-500">
          Interactive D3.js Line Chart Demo
        </div>
      </div>
    </div>
  );
};

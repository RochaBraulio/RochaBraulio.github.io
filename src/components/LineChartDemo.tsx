
import React, { useRef, useEffect } from "react";
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
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scale
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([innerHeight, 0]);

    // Main group
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(width < 400 ? 4 : 7).tickFormat(d3.timeFormat("%Y") as any))
      .attr("font-size", 12);

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .attr("font-size", 12);

    // Line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 3)
      .attr("d", d3.line<{ date: Date; value: number }>()
        .x(d => x(d.date))
        .y(d => y(d.value))
      );

    // Circles for points
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.value))
      .attr("r", 4)
      .attr("fill", "#38bdf8")
      .attr("stroke", "#0ea5e9")
      .attr("stroke-width", 1.5);

    // Tooltip interaction: basic (title tag on circles)
    g.selectAll("circle")
      .append("title")
      .text(d => `${d3.timeFormat("%b %Y")(d.date)}: ${d.value}`);

  }, [width, height]);

  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg ref={ref} width={width} height={height} style={{ maxWidth: "100%", height: "auto" }} />
      <div className="text-xs text-center mt-2 text-slate-500">
        Interactive D3.js Line Chart Demo
      </div>
    </div>
  );
};

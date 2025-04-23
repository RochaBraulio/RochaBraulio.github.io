
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export interface BarChartRaceDatum {
  name: string;
  value: number;
  year: number;
}

interface BarChartRaceProps {
  data: BarChartRaceDatum[];
  width?: number;
  height?: number;
}

export const BarChartRace: React.FC<BarChartRaceProps> = ({
  data,
  width = 600,
  height = 350,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted flag after initial render to ensure SSR compatibility
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !svgRef.current || !data.length) return;

    // Clear any existing content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const years = Array.from(new Set(data.map(d => d.year))).sort();
    const n = 5; // top N bars to show

    let yearIdx = 0;
    const { left, right, top, bottom } = { left: 80, right: 20, top: 30, bottom: 30 };
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;

    // Group data by year
    const byYear: Record<number, BarChartRaceDatum[]> = {};
    data.forEach(d => {
      if (!byYear[d.year]) byYear[d.year] = [];
      byYear[d.year].push(d);
    });

    console.log("BarChartRace data processed:", byYear);

    function draw(year: number) {
      const yearData = (byYear[year] || [])
        .slice()
        .sort((a, b) => b.value - a.value)
        .slice(0, n);

      console.log(`Drawing year ${year} with data:`, yearData);

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(yearData, d => d.value) || 1])
        .range([0, chartWidth]);

      const y = d3
        .scaleBand()
        .domain(yearData.map(d => d.name))
        .range([0, chartHeight])
        .padding(0.1);

      // Create/update bars
      svg
        .selectAll(".bar")
        .data(yearData, d => (d as BarChartRaceDatum).name)
        .join(
          enter => enter
            .append("rect")
            .attr("class", "bar")
            .attr("fill", "#60a5fa")
            .attr("x", left)
            .attr("y", d => top + y((d as BarChartRaceDatum).name)!)
            .attr("height", y.bandwidth())
            .attr("width", 0), // Start with width 0 for animation
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(400)
        .attr("x", left)
        .attr("y", d => top + y((d as BarChartRaceDatum).name)!)
        .attr("height", y.bandwidth())
        .attr("width", d => x((d as BarChartRaceDatum).value));

      // Create/update bar labels (names)
      svg
        .selectAll(".bar-label")
        .data(yearData, d => (d as BarChartRaceDatum).name)
        .join(
          enter => enter
            .append("text")
            .attr("class", "bar-label")
            .attr("x", left - 8)
            .attr("y", d => top + (y((d as BarChartRaceDatum).name)! + y.bandwidth() / 2))
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .attr("opacity", 0),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(400)
        .attr("x", left - 8)
        .attr("y", d => top + (y((d as BarChartRaceDatum).name)! + y.bandwidth() / 2))
        .attr("opacity", 1)
        .text(d => (d as BarChartRaceDatum).name)
        .style("font-size", "14px")
        .style("fill", "#1e293b");

      // Create/update bar values
      svg
        .selectAll(".bar-value")
        .data(yearData, d => (d as BarChartRaceDatum).name)
        .join(
          enter => enter
            .append("text")
            .attr("class", "bar-value")
            .attr("x", d => left + x((d as BarChartRaceDatum).value) + 6)
            .attr("y", d => top + (y((d as BarChartRaceDatum).name)! + y.bandwidth() / 2))
            .attr("dy", "0.35em")
            .attr("text-anchor", "start")
            .attr("opacity", 0),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(400)
        .attr("x", d => left + x((d as BarChartRaceDatum).value) + 6)
        .attr("y", d => top + (y((d as BarChartRaceDatum).name)! + y.bandwidth() / 2))
        .attr("opacity", 1)
        .text(d => (d as BarChartRaceDatum).value)
        .style("font-size", "13px")
        .style("fill", "#075985");

      // X Axis - Create or update the axis
      let xAxisGroup = svg.select<SVGGElement>(".x-axis");
      
      if (xAxisGroup.empty()) {
        xAxisGroup = svg
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(${left},${top + chartHeight})`);
      } else {
        xAxisGroup.attr("transform", `translate(${left},${top + chartHeight})`);
      }
      
      xAxisGroup.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0) as any);

      // Year label - Create or update
      let yearLabel = svg.select(".year-label");
      
      if (yearLabel.empty()) {
        yearLabel = svg
          .append("text")
          .attr("class", "year-label")
          .attr("x", width / 2)
          .attr("y", top - 8)
          .attr("text-anchor", "middle")
          .attr("font-size", 24)
          .attr("font-weight", 600)
          .style("fill", "#0f172a");
      }
      
      yearLabel.text(year);
    }

    let interval: ReturnType<typeof setTimeout> | null = null;
    let stopped = false;
    
    function animate() {
      draw(years[yearIdx]);
      yearIdx++;
      if (yearIdx < years.length && !stopped) {
        interval = setTimeout(animate, 1200);
      } else if (yearIdx >= years.length) {
        // Reset animation after completing
        yearIdx = 0;
        setTimeout(animate, 2000);
      }
    }
    
    // Start the animation
    console.log("Starting BarChartRace animation");
    animate();

    return () => {
      stopped = true;
      if (interval) clearTimeout(interval);
    };
  }, [data, width, height, isMounted]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ 
        background: "#f0f6f9", 
        borderRadius: "12px", 
        overflow: "visible",
        maxWidth: "100%"
      }}
      className="mx-auto"
    />
  );
};


import React, { useEffect, useRef } from "react";
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
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(ref.current);
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

    function draw(year: number) {
      const yearData = (byYear[year] || [])
        .slice()
        .sort((a, b) => b.value - a.value)
        .slice(0, n);

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(yearData, d => d.value) || 1])
        .range([0, chartWidth]);

      const y = d3
        .scaleBand()
        .domain(yearData.map(d => d.name))
        .range([0, chartHeight])
        .padding(0.1);

      svg
        .selectAll(".bar")
        .data(yearData, d => (d as BarChartRaceDatum).name)
        .join("rect")
        .attr("class", "bar")
        .attr("fill", "#60a5fa")
        .transition()
        .duration(400)
        .attr("x", left)
        .attr("y", d => top + y((d as BarChartRaceDatum).name)!)
        .attr("height", y.bandwidth())
        .attr("width", d => x((d as BarChartRaceDatum).value));

      svg
        .selectAll(".bar-label")
        .data(yearData, d => (d as BarChartRaceDatum).name)
        .join("text")
        .attr("class", "bar-label")
        .attr("x", left - 8)
        .attr("y", d => top + (y((d as BarChartRaceDatum).name)! + y.bandwidth() / 2))
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text(d => (d as BarChartRaceDatum).name)
        .style("font-size", "14px")
        .style("fill", "#1e293b");

      svg
        .selectAll(".bar-value")
        .data(yearData, d => (d as BarChartRaceDatum).name)
        .join("text")
        .attr("class", "bar-value")
        .attr("x", d => left + x((d as BarChartRaceDatum).value) + 6)
        .attr("y", d => top + (y((d as BarChartRaceDatum).name)! + y.bandwidth() / 2))
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .text(d => (d as BarChartRaceDatum).value)
        .style("font-size", "13px")
        .style("fill", "#075985");

      // X Axis - Fix the TypeScript error by creating the axis group first
      const xAxisGroup = svg
        .selectAll<SVGGElement, number>(".x-axis")
        .data([0])
        .join(
          enter => enter.append("g").attr("class", "x-axis"),
          update => update,
          exit => exit.remove()
        )
        .attr("transform", `translate(${left},${top + chartHeight})`);
      
      // Now call the axis on the properly typed group
      xAxisGroup.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0) as any);

      // Year label
      svg
        .selectAll(".year-label")
        .data([year])
        .join("text")
        .attr("class", "year-label")
        .attr("x", width / 2)
        .attr("y", top - 8)
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .attr("font-weight", 600)
        .style("fill", "#0f172a")
        .text(year);
    }

    let interval: any = null;
    let stopped = false;
    function animate() {
      draw(years[yearIdx]);
      yearIdx++;
      if (yearIdx < years.length && !stopped) {
        interval = setTimeout(animate, 1200);
      }
    }
    animate();

    return () => {
      stopped = true;
      clearTimeout(interval);
    };
    // eslint-disable-next-line
  }, [data, width, height]);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      style={{ background: "#f0f6f9", borderRadius: "12px" }}
    />
  );
};

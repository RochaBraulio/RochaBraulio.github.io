
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface D3LineChartProps {
  width?: number;
  height?: number;
}

export const D3LineChart = ({ width = 800, height = 400 }: D3LineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Generate sample data
    const data = Array.from({ length: 50 }, (_, i) => ({
      date: new Date(2025, 0, i + 1),
      value: Math.random() * 100
    }));

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([innerHeight, 0]);

    // Add line path
    const line = d3.line<{date: Date; value: number}>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#007AFF')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(y)
        .tickSize(-innerWidth)
        .tickFormat(() => '')
      );
  }, [width, height]);

  return (
    <div className="w-full overflow-x-auto bg-card rounded-lg p-4 my-8">
      <svg ref={svgRef} className="w-full max-w-full" />
    </div>
  );
};

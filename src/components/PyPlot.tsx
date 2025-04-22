
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface PyPlotProps {
  code: string;
  width?: number;
  height?: number;
}

// Very simple parser to extract basic plot information from matplotlib-like code
const parsePlotCode = (code: string) => {
  const result: any = {
    type: 'bar',
    x: [],
    y: [],
    orientation: 'v',
    title: 'Plot',
    xaxis: { title: 'X' },
    yaxis: { title: 'Y' },
  };

  // Try to extract data
  const dataMatch = code.match(/y\s*=\s*\[(.*?)\]/s);
  if (dataMatch && dataMatch[1]) {
    result.y = dataMatch[1].split(',').map(s => parseFloat(s.trim()));
  }

  // Try to extract x labels
  const xMatch = code.match(/x\s*=\s*\[(.*?)\]/s);
  if (xMatch && xMatch[1]) {
    result.x = xMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
  }

  // Check for horizontal orientation
  if (code.includes('barh(') || code.includes('horizontal=True')) {
    result.orientation = 'h';
    // Swap x and y for horizontal bar charts
    [result.x, result.y] = [result.y, result.x];
  }

  // Try to extract title
  const titleMatch = code.match(/title\s*=\s*['"](.*?)['"]/);
  if (titleMatch && titleMatch[1]) {
    result.title = titleMatch[1];
  }

  // Try to extract axis labels
  const xlabelMatch = code.match(/xlabel\s*\(\s*['"](.*?)['"]/);
  if (xlabelMatch && xlabelMatch[1]) {
    result.xaxis.title = xlabelMatch[1];
  }

  const ylabelMatch = code.match(/ylabel\s*\(\s*['"](.*?)['"]/);
  if (ylabelMatch && ylabelMatch[1]) {
    result.yaxis.title = ylabelMatch[1];
  }

  return result;
};

export const PyPlot: React.FC<PyPlotProps> = ({ code, width = 800, height = 500 }) => {
  const [plotData, setPlotData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = parsePlotCode(code);
      
      const data = [{
        type: parsed.orientation === 'h' ? 'bar' : 'bar',
        x: parsed.x,
        y: parsed.y,
        orientation: parsed.orientation,
      }];
      
      const layout = {
        title: parsed.title,
        xaxis: { title: parsed.xaxis.title },
        yaxis: { title: parsed.yaxis.title },
        autosize: true,
        margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
      };
      
      setPlotData({ data, layout });
      setError(null);
    } catch (err) {
      console.error('Failed to parse matplotlib code:', err);
      setError('Failed to parse matplotlib code');
    }
  }, [code]);

  if (error) {
    return (
      <div className="bg-card rounded-lg p-4 my-8 text-destructive">
        <p>{error}</p>
        <pre className="mt-2 text-xs overflow-x-auto">{code}</pre>
      </div>
    );
  }

  if (!plotData) {
    return <div className="bg-card rounded-lg p-4 my-8">Loading plot...</div>;
  }

  return (
    <div className="w-full overflow-x-auto bg-card rounded-lg p-4 my-8">
      <Plot
        data={plotData.data}
        layout={{ ...plotData.layout, width, height }}
        config={{ responsive: true }}
      />
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-muted-foreground">View Python code</summary>
        <pre className="mt-2 p-4 bg-muted text-xs overflow-x-auto rounded">{code}</pre>
      </details>
    </div>
  );
};

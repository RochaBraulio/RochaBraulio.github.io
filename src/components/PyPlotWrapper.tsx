
import React from 'react';
import { PlotlyPlot } from './PlotlyPlot';

// This component serves as a drop-in replacement for the original PyPlot
export const PyPlot = (props: { code: string; width?: number; height?: number }) => {
  return <PlotlyPlot {...props} />;
};

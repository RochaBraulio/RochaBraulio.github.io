
declare module 'react-plotly.js' {
  import * as Plotly from 'plotly.js';
  import * as React from 'react';

  interface PlotParams {
    data: Plotly.Data[];
    layout?: Partial<Plotly.Layout>;
    frames?: Plotly.Frame[];
    config?: Partial<Plotly.Config>;
    // Additional props
    style?: React.CSSProperties;
    className?: string;
    useResizeHandler?: boolean;
    debug?: boolean;
    onInitialized?: (figure: Plotly.Figure, graphDiv: HTMLElement) => void;
    onUpdate?: (figure: Plotly.Figure, graphDiv: HTMLElement) => void;
    onPurge?: (figure: Plotly.Figure, graphDiv: HTMLElement) => void;
    onError?: (err: Error) => void;
    onAfterExport?: () => void;
    onAfterPlot?: () => void;
    onAnimated?: () => void;
    onAnimatingFrame?: (event: { name: string; frame: { data: any[]; name: string } }) => void;
    onAnimationInterrupted?: () => void;
    onAutoSize?: () => void;
    onBeforeExport?: () => void;
    onButtonClicked?: (event: { button: string; buttons: string[] }) => void;
    onClick?: (event: { points: any[] }) => void;
    onClickAnnotation?: (event: { annotation: any; fullAnnotation: any }) => void;
    onDeselect?: () => void;
    onDoubleClick?: () => void;
    onFramework?: () => void;
    onHover?: (event: { points: any[] }) => void;
    onLegendClick?: (event: { curveNumber: number; expandedIndex: number }) => boolean;
    onLegendDoubleClick?: (event: { curveNumber: number; expandedIndex: number }) => boolean;
    onRelayout?: (event: any) => void;
    onRestyle?: (event: any) => void;
    onRedraw?: () => void;
    onSelected?: (event: { points: any[] }) => void;
    onSelecting?: (event: { points: any[] }) => void;
    onSliderChange?: (event: { slider: any; step: number; interaction: boolean }) => void;
    onSliderEnd?: (event: { slider: any; step: number; interaction: boolean }) => void;
    onSliderStart?: (event: { slider: any; step: number; interaction: boolean }) => void;
    onTransitioning?: () => void;
    onTransitionInterrupted?: () => void;
    onUnhover?: (event: { points: any[] }) => void;
  }

  class Plot extends React.Component<PlotParams> {}
  export default Plot;
}

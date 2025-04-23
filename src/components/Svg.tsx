
import React from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  borderWidth?: number | string;
}

export const Svg: React.FC<SvgProps> = ({
  width = 300,
  height = 200,
  borderColor = "gold",
  borderWidth = 2
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      style={{
        border: `${borderWidth}px solid ${borderColor}`
      }} 
    />
  )
};

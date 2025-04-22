
import React from 'react';

// This component is a placeholder until we implement proper plotting support
export const PyPlot = ({ code }: { code: string; width?: number; height?: number }) => {
  return (
    <div className="bg-card rounded-lg p-4 my-8">
      <p className="text-muted-foreground">Plot preview temporarily unavailable</p>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-muted-foreground">View Python code</summary>
        <pre className="mt-2 p-4 bg-muted text-xs overflow-x-auto rounded">{code}</pre>
      </details>
    </div>
  );
};

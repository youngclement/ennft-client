'use client';

import React from 'react';

interface ProgressBarProps {
  value: number; // Giá trị phần trăm (0 - 100)
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="w-full h-4 rounded-full overflow-hidden relative border-[2px] border-foreground">
      {/* Hiệu ứng sọc nền */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_10%,_transparent_10%)] bg-[size:10px_10px]" />

      {/* Thanh Progress */}
      <div
        className="h-full bg-foreground transition-all duration-500 ease-in-out"
        style={{ width: `${Math.max(1, Math.min(100, value))}%` }}
      />
    </div>
  );
}

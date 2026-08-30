import React from 'react';

export default function Tooltip({ children, label }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      {/* Tooltip Bubble */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-white dark:bg-[#1C1C1F] text-[#111214] dark:text-white text-xs font-body font-medium px-3 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-transparent dark:border-border relative">
          {label}
          {/* Arrow / Tail */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[5px] border-transparent border-t-white dark:border-t-[#1C1C1F]"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-[1px] border-[5px] border-transparent border-t-transparent dark:border-t-border -z-10"></div>
        </div>
      </div>
    </div>
  );
}

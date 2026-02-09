import React, { useState } from 'react';

interface ChartData {
  day: number;
  placedOrder: number;
  delivered: number;
  canceled: number;
}

interface FigmaSalesPerformanceProps {
  data?: ChartData[];
  onTimeFilterChange?: (filter: string) => void;
}

const FigmaSalesPerformance: React.FC<FigmaSalesPerformanceProps> = ({
  data = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    placedOrder: Math.floor(Math.random() * 50) + 30,
    delivered: Math.floor(Math.random() * 40) + 20,
    canceled: Math.floor(Math.random() * 15) + 5
  })),
  onTimeFilterChange = () => {}
}) => {
  const [activeFilter, setActiveFilter] = useState('Month');
  const maxValue = 100;
  
  const createSmoothPath = (values: number[], chartWidth: number, chartHeight: number) => {
    const points = values.map((value, index) => ({
      x: (index / (values.length - 1)) * chartWidth,
      y: chartHeight - (value / maxValue) * chartHeight
    }));
    if (points.length < 2) return '';
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlPointX = (current.x + next.x) / 2;
      path += ` C ${controlPointX},${current.y} ${controlPointX},${next.y} ${next.x},${next.y}`;
    }
    return path;
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onTimeFilterChange(filter);
  };

  return (
    <div 
      className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 flex flex-col gap-2 sm:gap-2.5 lg:gap-4 hover:shadow-lg transition-shadow duration-300"
      style={{ 
        outline: '0.5px solid rgba(0, 0, 0, 0.1)',
        fontFamily: 'Lato, sans-serif'
      }}
    >
      {/* Header with filters */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 lg:gap-4">
        <div className="text-zinc-800 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>
          Sale Performance
        </div>
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-wrap">
          {['Day', 'Month', 'Year', 'All'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-2 sm:px-2.5 md:px-3 lg:px-4 lg:w-auto py-0.5 sm:py-1 lg:py-1.5 rounded-md sm:rounded-lg flex justify-center items-center text-[10px] sm:text-xs md:text-sm lg:text-base font-medium transition-all hover:shadow-sm ${
                activeFilter === filter
                  ? 'bg-gradient-to-b from-orange-500 to-amber-500 text-white shadow-md'
                  : 'bg-stone-50 text-neutral-400 hover:bg-stone-100'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {filter}
            </button>
          ))}
          <div className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <span className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-normal truncate max-w-[70px] sm:max-w-none" style={{ fontFamily: 'Lato, sans-serif' }}>
              December 2025
            </span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0">
              <path d="M2 5L10 10L2 15" fill="white" transform="rotate(90 10 10)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        <span className="text-sky-400 text-[10px] sm:text-xs md:text-sm lg:text-base font-bold cursor-pointer hover:opacity-70 transition-opacity" style={{ fontFamily: 'Poppins, sans-serif' }}>Placed Order</span>
        <span className="text-orange-500 text-[10px] sm:text-xs md:text-sm lg:text-base font-bold cursor-pointer hover:opacity-70 transition-opacity" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Delivered</span>
        <span className="text-red-700 text-[10px] sm:text-xs md:text-sm lg:text-base font-bold cursor-pointer hover:opacity-70 transition-opacity" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Cancel</span>
      </div>

      {/* Chart */}
      <div className="relative h-32 sm:h-40 md:h-44 lg:h-52 xl:h-60">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((val) => (
            <span 
              key={val} 
              className="w-4 sm:w-5 md:w-6 lg:w-8 h-6 sm:h-8 md:h-9 lg:h-10 opacity-50 text-right text-neutral-900 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {val}
            </span>
          ))}
        </div>
        
        {/* Chart area */}
        <div className="ml-5 sm:ml-6 md:ml-8 lg:ml-10 h-full relative">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="absolute w-full border-t border-zinc-200" 
              style={{ top: `${i * 25}%` }} 
            />
          ))}
          
          {/* Line chart */}
          <svg className="w-full h-full" viewBox="0 0 700 180" preserveAspectRatio="none">
            {/* Placed Order (sky-400) */}
            <path
              d={createSmoothPath(data.map(d => d.placedOrder), 700, 180)}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              className="hover:stroke-[3] transition-all"
            />
            {/* Order Delivered (orange-500) */}
            <path
              d={createSmoothPath(data.map(d => d.delivered), 700, 180)}
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
              className="hover:stroke-[3] transition-all"
            />
            {/* Order Cancel (red-700) */}
            <path
              d={createSmoothPath(data.map(d => d.canceled), 700, 180)}
              fill="none"
              stroke="#B91C1C"
              strokeWidth="2"
              className="hover:stroke-[3] transition-all"
            />
          </svg>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="ml-5 sm:ml-6 md:ml-8 lg:ml-10 flex justify-between overflow-x-auto">
        {Array.from({ length: 31 }, (_, i) => (
          <span 
            key={i}
            className="opacity-50 text-neutral-900 text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-medium"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FigmaSalesPerformance;

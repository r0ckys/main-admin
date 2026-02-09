import React from 'react';

interface ChartData {
  label: string;
  mobile: number;
  tab: number;
  desktop: number;
}

interface FigmaAnalyticsChartProps {
  data?: ChartData[];
  timeFilter?: string;
  onTimeFilterChange?: (filter: string) => void;
}

const FigmaAnalyticsChart: React.FC<FigmaAnalyticsChartProps> = ({
  data = [
    { label: 'Jan 25', mobile: 30, tab: 35, desktop: 40 },
    { label: 'Jan 26', mobile: 35, tab: 45, desktop: 55 },
    { label: 'Jan 27', mobile: 45, tab: 55, desktop: 70 },
    { label: 'Jan 28', mobile: 35, tab: 45, desktop: 55 },
    { label: 'Jan 29', mobile: 30, tab: 35, desktop: 40 },
    { label: 'Jan 30', mobile: 40, tab: 50, desktop: 60 },
    { label: 'Jan 31', mobile: 30, tab: 35, desktop: 40 }
  ],
  timeFilter = 'December 2025',
  onTimeFilterChange = () => {}
}) => {
  const maxValue = Math.max(...data.flatMap(d => [d.mobile, d.tab, d.desktop]));
  
  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full">
      {/* Header with title and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Device Analytics</h3>
        
        {/* Time Filter */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-wrap">
          <button className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md lg:rounded-lg transition-all" style={{ fontFamily: 'Poppins, sans-serif' }}>Day</button>
          <button className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-shadow" style={{ fontFamily: 'Poppins, sans-serif' }}>Month</button>
          <button className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md lg:rounded-lg transition-all" style={{ fontFamily: 'Poppins, sans-serif' }}>Year</button>
          <button className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md lg:rounded-lg transition-all hidden xs:block" style={{ fontFamily: 'Poppins, sans-serif' }}>All Time</button>
          <div className="ml-1 sm:ml-2 md:ml-4 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 bg-gray-50 rounded-md sm:rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 truncate max-w-[80px] sm:max-w-none" style={{ fontFamily: 'Poppins, sans-serif' }}>{timeFilter}</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-36 sm:h-48 md:h-56 lg:h-64 xl:h-72 flex flex-col justify-between text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-5 sm:ml-6 md:ml-8 lg:ml-10 relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full border-t border-gray-100" style={{ top: `${i * 25}%` }} />
            ))}
          </div>
          
          {/* Bars */}
          <div className="flex items-end justify-between h-36 sm:h-48 md:h-56 lg:h-64 xl:h-72 relative z-10">
            {data.map((item, index) => {
              const mobileHeight = (item.mobile / maxValue) * 100;
              const tabHeight = (item.tab / maxValue) * 100;
              const desktopHeight = (item.desktop / maxValue) * 100;
              
              return (
                <div key={index} className="flex items-end gap-0.5 sm:gap-1 lg:gap-1.5 group" style={{ height: '100%' }}>
                  {/* Mobile */}
                  <div 
                    className="w-2 sm:w-3 md:w-4 lg:w-6 xl:w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                    style={{ height: `${mobileHeight}%` }}
                    title={`Mobile: ${item.mobile}`}
                  />
                  {/* Tab */}
                  <div 
                    className="w-2 sm:w-3 md:w-4 lg:w-6 xl:w-8 bg-orange-400 rounded-t hover:bg-orange-500 transition-colors cursor-pointer"
                    style={{ height: `${tabHeight}%` }}
                    title={`Tab: ${item.tab}`}
                  />
                  {/* Desktop */}
                  <div 
                    className="w-2 sm:w-3 md:w-4 lg:w-6 xl:w-8 bg-purple-500 rounded-t hover:bg-purple-600 transition-colors cursor-pointer"
                    style={{ height: `${desktopHeight}%` }}
                    title={`Desktop: ${item.desktop}`}
                  />
                </div>
              );
            })}
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {data.map((item, index) => (
              <span key={index} className="text-center flex-1">
                {item.label.split(' ')[1]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-3 sm:mt-4 md:mt-6 lg:mt-8">
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-500 rounded"></div>
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}><span className="hidden sm:inline">Mobile </span>View</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-orange-400 rounded"></div>
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}><span className="hidden sm:inline">Tab </span>View</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-purple-500 rounded"></div>
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}><span className="hidden sm:inline">Desktop </span>View</span>
        </div>
      </div>
    </div>
  );
};

export default FigmaAnalyticsChart;

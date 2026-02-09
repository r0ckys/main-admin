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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      {/* Time Filter */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Day</button>
          <button className="px-4 py-2 text-sm bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Month</button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Year</button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>All Time</button>
          <div className="ml-4 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{timeFilter}</span>
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full border-t border-gray-100" style={{ top: `${i * 25}%` }} />
            ))}
          </div>
          
          {/* Bars */}
          <div className="flex items-end justify-between h-64 relative z-10">
            {data.map((item, index) => {
              const mobileHeight = (item.mobile / maxValue) * 100;
              const tabHeight = (item.tab / maxValue) * 100;
              const desktopHeight = (item.desktop / maxValue) * 100;
              
              return (
                <div key={index} className="flex items-end gap-1" style={{ height: '100%' }}>
                  {/* Mobile */}
                  <div 
                    className="w-6 bg-blue-500 rounded-t"
                    style={{ height: `${mobileHeight}%` }}
                    title={`Mobile: ${item.mobile}`}
                  />
                  {/* Tab */}
                  <div 
                    className="w-6 bg-orange-400 rounded-t"
                    style={{ height: `${tabHeight}%` }}
                    title={`Tab: ${item.tab}`}
                  />
                  {/* Desktop */}
                  <div 
                    className="w-6 bg-purple-500 rounded-t"
                    style={{ height: `${desktopHeight}%` }}
                    title={`Desktop: ${item.desktop}`}
                  />
                </div>
              );
            })}
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-4 text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {data.map((item, index) => (
              <span key={index} className="text-center" style={{ width: '80px' }}>
                {item.label.split(' ')[1]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Mobile View</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <span className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Tab View</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Desktop View</span>
        </div>
      </div>
    </div>
  );
};

export default FigmaAnalyticsChart;

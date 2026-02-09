import React from 'react';

// Online Now Icon (Wifi/Signal style)
const OnlineNowIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28C20.1046 28 21 27.1046 21 26C21 24.8954 20.1046 24 19 24C17.8954 24 17 24.8954 17 26C17 27.1046 17.8954 28 19 28Z" fill="#008DFF"/>
    <path d="M11 20C13.2091 17.7909 16.0909 16.6364 19 16.6364C21.9091 16.6364 24.7909 17.7909 27 20" stroke="#008DFF" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 15C9.5 11.5 14.0909 9.63636 19 9.63636C23.9091 9.63636 28.5 11.5 32 15" stroke="#008DFF" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Today Visitors Icon (Users style)
const TodayVisitorsIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.5 28V26C26.5 24.4087 25.8679 22.8826 24.7426 21.7574C23.6174 20.6321 22.0913 20 20.5 20H11.5C9.90871 20 8.38258 20.6321 7.25736 21.7574C6.13214 22.8826 5.5 24.4087 5.5 26V28" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32.5 28V26C32.4987 24.6706 32.0478 23.3822 31.2217 22.3462C30.3957 21.3102 29.2446 20.5882 27.9583 20.3" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.9583 4.3C26.2477 4.58649 27.4022 5.30895 28.2302 6.34696C29.0582 7.38497 29.5094 8.67688 29.5094 10.01C29.5094 11.3431 29.0582 12.635 28.2302 13.673C27.4022 14.711 26.2477 15.4335 24.9583 15.72" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Total Visitors Icon (Grid style)
const TotalVisitorsIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="28" height="28" rx="2" stroke="#3F34BE" strokeWidth="2"/>
    <line x1="19" y1="5" x2="19" y2="33" stroke="#3F34BE" strokeWidth="2"/>
    <line x1="5" y1="19" x2="33" y2="19" stroke="#3F34BE" strokeWidth="2"/>
  </svg>
);

interface VisitorCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: number;
  theme: 'blue' | 'orange' | 'purple';
}

const VisitorCard: React.FC<VisitorCardProps> = ({
  icon,
  title,
  subtitle,
  value,
  theme
}) => {
  const themes = {
    blue: {
      bgClass: 'bg-blue-50',
      circleClass: 'bg-blue-200/50',
      titleColor: '#008DFF',
      hoverBorder: 'hover:border-blue-200'
    },
    orange: {
      bgClass: 'bg-orange-50',
      circleClass: 'bg-orange-200/50',
      titleColor: '#FF5500',
      hoverBorder: 'hover:border-orange-200'
    },
    purple: {
      bgClass: 'bg-purple-50',
      circleClass: 'bg-purple-200/50',
      titleColor: '#3F34BE',
      hoverBorder: 'hover:border-purple-200'
    }
  };

  const config = themes[theme];

  return (
    <div className={`relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl ${config.bgClass} p-2.5 sm:p-3 md:p-4 lg:p-5 border border-transparent ${config.hoverBorder} hover:shadow-lg transition-all duration-300 cursor-pointer group`}>
      {/* Background decorative circle */}
      <div 
        className={`absolute w-28 sm:w-36 md:w-40 lg:w-48 h-28 sm:h-36 md:h-40 lg:h-48 rounded-full ${config.circleClass} group-hover:scale-110 transition-transform duration-500`}
        style={{ right: '-20px', top: '-40px' }}
      />
      
      <div className="relative z-10 flex items-center justify-between gap-2 lg:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Icon */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          
          {/* Text */}
          <div className="flex flex-col min-w-0">
            <span
              className="text-xs sm:text-sm lg:text-base font-medium truncate"
              style={{ color: config.titleColor, fontFamily: 'Poppins, sans-serif' }}
            >
              {title}
            </span>
            <span
              className="text-[10px] sm:text-xs lg:text-sm text-gray-600 truncate"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {subtitle}
            </span>
          </div>
        </div>
        
        {/* Value */}
        <span
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 shrink-0 group-hover:scale-105 transition-transform"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

interface FigmaVisitorStatsProps {
  visitorStats?: {
    onlineNow?: number;
    todayVisitors?: number;
    totalVisitors?: number;
    last7Days?: number;
    pageViews?: number;
  };
}

const FigmaVisitorStats: React.FC<FigmaVisitorStatsProps> = ({
  visitorStats = {
    onlineNow: 35,
    todayVisitors: 35,
    totalVisitors: 35,
    last7Days: 4,
    pageViews: 15
  }
}) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 sm:gap-3">
      {/* Online Now - Blue theme */}
      <VisitorCard
        icon={<OnlineNowIcon />}
        title="Online Now"
        subtitle="Active visitors"
        value={visitorStats.onlineNow || 35}
        theme="blue"
      />
      
      {/* Today Visitors - Orange theme */}
      <VisitorCard
        icon={<TodayVisitorsIcon />}
        title="Today visitors"
        subtitle={`Last 7 days: ${visitorStats.last7Days || 4}`}
        value={visitorStats.todayVisitors || 35}
        theme="orange"
      />
      
      {/* Total Visitors - Purple theme */}
      <VisitorCard
        icon={<TotalVisitorsIcon />}
        title="Total visitors"
        subtitle={`${visitorStats.pageViews || 15} page view`}
        value={visitorStats.totalVisitors || 35}
        theme="purple"
      />
    </div>
  );
};

export default FigmaVisitorStats;

import React from 'react';
import {
  Radio,
  Users,
  Globe,
  Wifi
} from 'lucide-react';

interface VisitorStatItemProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  value: number;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  titleColor: string;
}

const VisitorStatItem: React.FC<VisitorStatItemProps> = ({
  icon: Icon,
  title,
  subtitle,
  value,
  gradientFrom,
  gradientTo,
  iconColor,
  titleColor
}) => {
  return (
    <div className={`rounded-xl p-5 relative overflow-hidden bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
      {/* Background Circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
          <div>
            <h3 className={`text-base font-medium ${titleColor}`} style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{subtitle}</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
      </div>
    </div>
  );
};

interface FigmaVisitorStatsProps {
  visitorStats?: {
    onlineNow?: number;
    todayVisitors?: number;
    totalVisitors?: number;
  };
}

const FigmaVisitorStats: React.FC<FigmaVisitorStatsProps> = ({
  visitorStats = {
    onlineNow: 35,
    todayVisitors: 35,
    totalVisitors: 35
  }
}) => {
  return (
    <div className="space-y-4">
      <VisitorStatItem
        icon={Wifi}
        title="Online Now"
        subtitle="Active visitors on site"
        value={visitorStats.onlineNow || 35}
        gradientFrom="from-white"
        gradientTo="to-green-50"
        iconColor="text-green-500"
        titleColor="text-green-600"
      />
      
      <VisitorStatItem
        icon={Users}
        title="Today visitors"
        subtitle="Last 7 days: 4"
        value={visitorStats.todayVisitors || 35}
        gradientFrom="from-white"
        gradientTo="to-orange-50"
        iconColor="text-orange-500"
        titleColor="text-orange-600"
      />
      
      <VisitorStatItem
        icon={Globe}
        title="Total visitors"
        subtitle="15 page view"
        value={visitorStats.totalVisitors || 35}
        gradientFrom="from-white"
        gradientTo="to-blue-50"
        iconColor="text-blue-500"
        titleColor="text-blue-600"
      />
    </div>
  );
};

export default FigmaVisitorStats;

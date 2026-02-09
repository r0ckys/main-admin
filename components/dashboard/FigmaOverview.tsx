import React from 'react';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingDown,
  Eye,
  Calendar,
  AlertCircle,
  Tag
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, iconBg, iconColor }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-4 h-full">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1">
          <div className="text-2xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
          <div className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</div>
        </div>
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

interface LanguageSelectorProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLangChange }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-4 h-full flex flex-col">
      <div className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Language</div>
      <div className="flex items-center gap-1 bg-white rounded-full p-1 w-fit">
        <button 
          onClick={() => onLangChange('en')}
          className={`px-4 py-1.5 text-xs rounded-full transition-colors ${
            currentLang === 'en' 
              ? 'bg-gray-100 text-gray-900 font-medium' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Eng
        </button>
        <button 
          onClick={() => onLangChange('bn')}
          className={`px-4 py-1.5 text-xs rounded-full transition-colors ${
            currentLang === 'bn' 
              ? 'bg-gray-100 text-gray-900 font-medium' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          বাংলা
        </button>
      </div>
    </div>
  );
};

interface DateDisplayProps {
  date: string;
  dayName: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date, dayName }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-4 h-full flex flex-col relative overflow-hidden">
      <div className="absolute -top-12 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10" />
      <div className="text-sm text-gray-600 mb-1 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>{date}</div>
      <div className="flex items-center justify-center mt-auto">
        <div className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg">
          <span className="text-2xl font-semibold text-white relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>{dayName}</span>
        </div>
      </div>
    </div>
  );
};

interface NotificationCardProps {
  title: string;
  content?: React.ReactNode;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, content }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-4 h-full flex flex-col">
      <div className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</div>
      <div className="bg-white rounded-lg h-24 mb-3 flex items-center justify-center overflow-hidden flex-1">
        <img 
          src="https://via.placeholder.com/300x100?text=Notification+Banner" 
          alt="Notification"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '';
            target.parentElement!.innerHTML = '<span class="text-gray-400 text-xs">Notification Banner</span>';
          }}
        />
      </div>
      <div className="flex justify-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-4 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

interface FigmaOverviewProps {
  stats?: {
    totalProducts?: number;
    totalOrders?: number;
    totalAmount?: string;
    lowStock?: number;
    toReview?: number;
  };
  currentLang?: string;
  onLangChange?: (lang: string) => void;
}

const FigmaOverview: React.FC<FigmaOverviewProps> = ({
  stats = {
    totalProducts: 45,
    totalOrders: 6550,
    totalAmount: '৳8,35,500',
    lowStock: 5,
    toReview: 452
  },
  currentLang = 'en',
  onLangChange = () => {}
}) => {
  // Get current date info
  const now = new Date();
  const currentDate = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="bg-white rounded-xl mx-6 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Row 1 */}
        <div className="lg:col-span-1">
          <StatCard
            title="Total Products"
            value={stats.totalProducts || 45}
            icon={Package}
            iconBg="bg-white"
            iconColor="text-blue-500"
          />
        </div>
        
        <div className="lg:col-span-1">
          <StatCard
            title="Total Orders"
            value={(stats.totalOrders || 6550).toLocaleString()}
            icon={ShoppingCart}
            iconBg="bg-white"
            iconColor="text-green-500"
          />
        </div>
        
        <div className="lg:col-span-1">
          <LanguageSelector currentLang={currentLang} onLangChange={onLangChange} />
        </div>
        
        <div className="lg:col-span-1">
          <DateDisplay date={currentDate} dayName={currentDay} />
        </div>
        
        <div className="lg:col-span-2">
          <NotificationCard title="Important Notification" />
        </div>

        {/* Row 2 */}
        <div className="lg:col-span-1">
          <StatCard
            title="Low Stock"
            value={stats.lowStock || 5}
            icon={AlertCircle}
            iconBg="bg-white"
            iconColor="text-orange-500"
          />
        </div>
        
        <div className="lg:col-span-1">
          <StatCard
            title="Total Amount"
            value={stats.totalAmount || '৳8,35,500'}
            icon={Tag}
            iconBg="bg-white"
            iconColor="text-purple-500"
          />
        </div>
        
        <div className="lg:col-span-1">
          <StatCard
            title="To be Reviewed"
            value={stats.toReview || 452}
            icon={Eye}
            iconBg="bg-white"
            iconColor="text-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FigmaOverview;

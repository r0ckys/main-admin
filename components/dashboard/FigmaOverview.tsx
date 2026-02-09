import React from 'react';

// Icon URLs
const ICON_URLS = {
  totalProduct: 'https://hdnfltv.com/image/nitimages/streamline-flex_production-belt-time__2_.webp',
  totalOrder: 'https://hdnfltv.com/image/nitimages/lets-icons_order-light__2_.webp',
  lowStock: 'https://hdnfltv.com/image/nitimages/hugeicons_hot-price__5_.webp',
  totalAmount: 'https://hdnfltv.com/image/nitimages/solar_tag-price-linear__2_.webp',
  toReview: 'https://hdnfltv.com/image/nitimages/mage_preview__1_.webp'
};

interface StatCardProps {
  title: string;
  value: string | number;
  iconUrl: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, iconUrl, iconBg }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 flex-1 min-w-[100px] sm:min-w-[120px] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between h-full gap-1.5 sm:gap-2 lg:gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
          <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</div>
        </div>
        <div className={`w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
          <img src={iconUrl} alt={title} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 object-contain" />
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
    <div className="bg-[#F5F5F5] rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 flex-1 min-w-[100px] sm:min-w-[120px] flex flex-col justify-center hover:shadow-md transition-shadow duration-300">
      <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500 mb-1 sm:mb-1.5 lg:mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Language</div>
      <div className="flex items-center gap-0.5 sm:gap-1 bg-white rounded-full p-0.5 w-fit shadow-sm">
        <button 
          onClick={() => onLangChange('en')}
          className={`px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 text-[10px] sm:text-xs lg:text-sm rounded-full transition-all duration-200 ${
            currentLang === 'en' 
              ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white font-medium shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Eng
        </button>
        <button 
          onClick={() => onLangChange('bn')}
          className={`px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 text-[10px] sm:text-xs lg:text-sm rounded-full transition-all duration-200 ${
            currentLang === 'bn' 
              ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white font-medium shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
    <div className="bg-[#F5F5F5] rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 flex-1 min-w-[80px] sm:min-w-[100px] flex flex-col relative overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="absolute -top-6 sm:-top-8 lg:-top-10 -right-4 sm:-right-6 lg:-right-8 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 opacity-90" />
      <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mb-0.5 sm:mb-1 lg:mb-2 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>{date}</div>
      <div className="flex items-center justify-center mt-auto relative z-10">
        <div className="px-2 sm:px-4 lg:px-6 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{dayName}</span>
        </div>
      </div>
    </div>
  );
};

interface NotificationCardProps {
  title: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 flex-[1.5] min-w-[120px] sm:min-w-[150px] flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500 mb-1 sm:mb-2 lg:mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</div>
      <div className="bg-white rounded-md sm:rounded-lg h-8 sm:h-10 lg:h-12 flex items-center justify-center overflow-hidden flex-1 border border-dashed border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
        <span className="text-gray-400 text-[10px] sm:text-xs lg:text-sm">Notification Banner</span>
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
  const now = new Date();
  const currentDate = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl mx-2 sm:mx-3 md:mx-4 lg:mx-6 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 lg:mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Analytics</h2>
      
      {/* Row 1 - Responsive grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 xl:gap-5 mb-2 sm:mb-3 lg:mb-4">
        <StatCard
          title="Products on Hands"
          value={stats.totalProducts || 45}
          iconUrl={ICON_URLS.totalProduct}
          iconBg="bg-white"
        />
        
        <StatCard
          title="Total Orders"
          value={(stats.totalOrders || 6550).toLocaleString()}
          iconUrl={ICON_URLS.totalOrder}
          iconBg="bg-white"
        />
        
        <LanguageSelector currentLang={currentLang} onLangChange={onLangChange} />
        
        <DateDisplay date={currentDate} dayName={currentDay} />
        
        <div className="col-span-2 xs:col-span-1">
          <NotificationCard title="Important Notification" />
        </div>
      </div>

      {/* Row 2 - Responsive grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
        <StatCard
          title="Reserved Price"
          value={stats.totalAmount || '৳8,35,500'}
          iconUrl={ICON_URLS.totalAmount}
          iconBg="bg-white"
        />
        
        <StatCard
          title="Low Stock"
          value={stats.lowStock || 5}
          iconUrl={ICON_URLS.lowStock}
          iconBg="bg-blue-500"
        />
        
        <StatCard
          title="To be Reviewed"
          value={stats.toReview || 452}
          iconUrl={ICON_URLS.toReview}
          iconBg="bg-white"
        />
      </div>
    </div>
  );
};

export default FigmaOverview;

import React from 'react';

// SVG Icons matching Figma design
const TodayIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.5V10L14 12" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 10C5.5 6 8.5 3 12 3C15.5 3 18.5 6 19 10" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CourierIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L12 13L21 8L12 3L3 8Z" fill="#D97706"/>
  </svg>
);

const ConfirmedIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11.5 14.5L16 9" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="1.5"/>
  </svg>
);

const PendingIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#EAB308" strokeWidth="1.5"/>
    <path d="M15 9.5L12.8 12L15 14.5" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CanceledIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="1.2"/>
    <path d="M15 9L9 15M9 9L15 15" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ReturnsIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#1D4ED8" strokeWidth="1.2"/>
    <path d="M8 12L11 9M11 15L8 12" stroke="#1D4ED8" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M16 12H8" stroke="#1D4ED8" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

interface OrderStatusItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  iconBg: string;
}

const OrderStatusItem: React.FC<OrderStatusItemProps> = ({ 
  icon, 
  label, 
  count, 
  iconBg 
}) => {
  return (
    <div 
      className="w-full sm:w-auto sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px] h-10 sm:h-11 md:h-12 lg:h-14 relative bg-white rounded-lg lg:rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
      style={{ 
        boxShadow: '0px 2px 9.6px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <div className={`absolute left-1.5 sm:left-2 lg:left-3 top-1 sm:top-2 lg:top-2.5 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 ${iconBg} rounded-md sm:rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="absolute left-9 sm:left-[46px] lg:left-[52px] top-[50%] -translate-y-1/2 sm:translate-y-0 sm:top-[15px] lg:top-[18px] text-black text-[11px] sm:text-xs lg:text-sm font-medium">
        {label}
      </div>
      <div className="absolute right-2 sm:right-3 lg:right-4 md:left-auto top-[50%] -translate-y-1/2 sm:translate-y-0 sm:top-[6px] lg:top-[8px] text-black text-xl sm:text-2xl lg:text-3xl font-medium group-hover:text-blue-600 transition-colors">
        {count}
      </div>
    </div>
  );
};

interface FigmaOrderStatusProps {
  orderStats?: {
    today?: number;
    pending?: number;
    confirmed?: number;
    courier?: number;
    canceled?: number;
    returns?: number;
  };
}

const FigmaOrderStatus: React.FC<FigmaOrderStatusProps> = ({
  orderStats = {
    today: 35,
    pending: 35,
    confirmed: 35,
    courier: 35,
    canceled: 35,
    returns: 35
  }
}) => {
  return (
    <div className="px-3 sm:px-4 md:px-5 lg:px-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h2 className="text-black text-sm sm:text-base font-semibold mb-2 sm:mb-3 md:mb-4">Order</h2>
      
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        <OrderStatusItem
          icon={<TodayIcon />}
          label="Today"
          count={orderStats.today || 35}
          iconBg="bg-pink-100"
        />
        
        <OrderStatusItem
          icon={<CourierIcon />}
          label="Courier"
          count={orderStats.courier || 35}
          iconBg="bg-orange-100"
        />
        
        <OrderStatusItem
          icon={<ConfirmedIcon />}
          label="Confirmed"
          count={orderStats.confirmed || 35}
          iconBg="bg-green-100"
        />
        
        <OrderStatusItem
          icon={<PendingIcon />}
          label="Pending"
          count={orderStats.pending || 35}
          iconBg="bg-amber-100"
        />
        
        <OrderStatusItem
          icon={<CanceledIcon />}
          label="Canceled"
          count={orderStats.canceled || 35}
          iconBg="bg-red-100"
        />
        
        <OrderStatusItem
          icon={<ReturnsIcon />}
          label="Returns"
          count={orderStats.returns || 35}
          iconBg="bg-blue-100"
        />
      </div>
    </div>
  );
};

export default FigmaOrderStatus;

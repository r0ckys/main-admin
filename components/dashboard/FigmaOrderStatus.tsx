import React from 'react';
import {
  Clock,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  RotateCcw
} from 'lucide-react';

interface OrderStatusItemProps {
  icon: React.ComponentType<any>;
  label: string;
  count: number;
  iconBg: string;
  iconColor: string;
}

const OrderStatusItem: React.FC<OrderStatusItemProps> = ({ 
  icon: Icon, 
  label, 
  count, 
  iconBg, 
  iconColor 
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 min-w-[160px]">
      <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <span className="text-sm text-gray-600 flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</span>
      <span className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{count}</span>
    </div>
  );
};

interface FigmaOrderStatusProps {
  orderStats?: {
    pending?: number;
    confirmed?: number;
    courier?: number;
    delivered?: number;
    canceled?: number;
    returns?: number;
  };
}

const FigmaOrderStatus: React.FC<FigmaOrderStatusProps> = ({
  orderStats = {
    pending: 35,
    confirmed: 35,
    courier: 35,
    delivered: 35,
    canceled: 35,
    returns: 35
  }
}) => {
  return (
    <div className="px-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Order</h2>
      
      <div className="flex flex-wrap gap-3">
        <OrderStatusItem
          icon={Clock}
          label="Pending"
          count={orderStats.pending || 35}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
        
        <OrderStatusItem
          icon={CheckCircle}
          label="Confirmed"
          count={orderStats.confirmed || 35}
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
        
        <OrderStatusItem
          icon={Truck}
          label="Courier"
          count={orderStats.courier || 35}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        
        <OrderStatusItem
          icon={Package}
          label="Delivered"
          count={orderStats.delivered || 35}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
        />
        
        <OrderStatusItem
          icon={XCircle}
          label="Canceled"
          count={orderStats.canceled || 35}
          iconBg="bg-red-50"
          iconColor="text-red-500"
        />
        
        <OrderStatusItem
          icon={RotateCcw}
          label="Returns"
          count={orderStats.returns || 35}
          iconBg="bg-gray-100"
          iconColor="text-gray-500"
        />
      </div>
    </div>
  );
};

export default FigmaOrderStatus;

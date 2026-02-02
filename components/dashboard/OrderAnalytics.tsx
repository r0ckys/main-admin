import React from 'react';
import { Package, ShoppingCart, DollarSign, AlertTriangle, FileCheck } from 'lucide-react';
import { useLanguage, formatNumber, formatCurrency } from '../../context/LanguageContext';
import { OrderAnalyticsProps } from './types';

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({
  totalProducts,
  totalOrders,
  totalRevenue,
  lowStockProducts,
  toBeReviewed
}) => {
  const { language, setLanguage: setLang, t } = useLanguage();
  
  // Get current day info
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const currentDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

  return (
    <div className="w-full">
      <div className="text-base sm:text-lg font-bold text-slate-900 mb-3">
        Order Analytics
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* Products on Hands */}
        <div className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-200 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
              <Package className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <div className="text-xs text-slate-400 font-medium mb-1">
            {t('products_on_hand')}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {formatNumber(totalProducts, language)}
          </div>
        </div>

        {/* Total Orders */}
        <div className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-200 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-4 h-4 text-indigo-500" />
            </div>
          </div>
          <div className="text-xs text-slate-400 font-medium mb-1">
            {t('total_orders')}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {formatNumber(totalOrders, language)}
          </div>
        </div>

        {/* Language */}
        <div className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-200 transition-all">
          <div className="text-xs text-slate-400 font-medium mb-1.5">
            {t('language')}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                language === 'en' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Eng
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                language === 'bn' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer">
          <div className="text-xs text-blue-100 font-medium mb-1.5">
            {currentDate}
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {currentDay}
          </div>
        </div>

        {/* Revenue */}
        <div className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-200 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 bg-amber-50 rounded-lg group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div className="text-xs text-slate-400 font-medium mb-1">
            {t('revenue')}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {formatCurrency(totalRevenue, language)}
          </div>
        </div>

        {/* Low Stock */}
        <div className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-red-500/20 hover:border-red-200 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 bg-red-50 rounded-lg group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <div className="text-xs text-slate-400 font-medium mb-1">
            {t('low_stock')}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {formatNumber(lowStockProducts, language)}
          </div>
        </div>

        {/* To be Reviewed */}
        <div className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-200 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 bg-emerald-50 rounded-lg group-hover:scale-110 transition-transform">
              <FileCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="text-xs text-slate-400 font-medium mb-1">
            To be Reviewed
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {toBeReviewed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAnalytics;

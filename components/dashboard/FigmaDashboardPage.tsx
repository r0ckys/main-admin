import React, { useState } from 'react';
import {
  DashboardLayout,
  FigmaOverview,
  FigmaOrderStatus,
  FigmaVisitorStats,
  FigmaBestSellingProducts,
  FigmaTopProducts,
  FigmaSalesPerformance,
  FigmaSalesByCategory,
  FigmaAnalyticsChart
} from './index';
import { Order, Product } from '../../types';

interface FigmaDashboardPageProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  tenantId?: string;
  orders?: Order[];
  products?: Product[];
  onNavigate?: (page: string) => void;
}

const FigmaDashboardPage: React.FC<FigmaDashboardPageProps> = ({
  user = { name: 'Yuvraj' },
  tenantId = '',
  orders = [],
  products = [],
  onNavigate
}) => {
  const [language, setLanguage] = useState<string>('en');
  const [timeFilter, setTimeFilter] = useState<string>('Month');

  const handleSidebarNavigation = (page: string) => {
    console.log('Navigating to:', page);
    onNavigate?.(page);
  };

  // Calculate stats from real data if available
  const totalProducts = products.length || 45;
  const totalOrders = orders.length || 6550;
  const totalAmount = orders.reduce((sum, o) => sum + (o.amount || 0), 0) || 835500;
  const lowStock = products.filter(p => (p.stock || 0) < 10).length || 5;
  const toReview = orders.filter(o => o.status === 'Pending').length || 452;

  // Order status stats
  const pendingOrders = orders.filter(o => o.status === 'Pending').length || 35;
  const confirmedOrders = orders.filter(o => o.status === 'Confirmed').length || 35;
  const courierOrders = orders.filter(o => o.status === 'Sent to Courier' || o.status === 'Shipped').length || 35;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length || 35;
  const canceledOrders = orders.filter(o => o.status === 'Cancelled').length || 35;
  const returnsOrders = orders.filter(o => o.status === 'Returned').length || 35;

  // Format currency
  const formattedAmount = `৳${totalAmount.toLocaleString('en-IN')}`;

  // Best selling products data
  const bestSellingData = products.slice(0, 4).map((p, idx) => ({
    id: p.id || String(idx + 1),
    name: p.name || ['Apple iPhone 13', 'Nike Air Jordan', 'T-shirt', 'Cross Bag'][idx],
    totalOrder: String(Math.floor(Math.random() * 500) + 50),
    status: (p.stock || 0) > 20 ? 'In Stock' : (p.stock || 0) > 0 ? 'Low Stock' : 'Stock out' as 'In Stock' | 'Low Stock' | 'Stock out',
    price: `$${(p.price || 999).toFixed(2)}`,
    image: p.images?.[0]
  }));

  // Top products data
  const topProductsData = products.slice(0, 5).map((p, idx) => ({
    id: p.id || String(idx + 1),
    name: p.name || ['Apple iPhone 13', 'Nike Air Jordan', 'T-shirt', 'Assorted Cross Bag', 'Fur Pom Gloves'][idx],
    itemCode: `#FXZ-${4567 + idx}`,
    price: `$${(p.price || [999, 72.4, 35.4, 80, 45][idx]).toFixed(2)}`,
    image: p.images?.[0]
  }));

  return (
    <DashboardLayout
      sidebarProps={{
        activeItem: 'dashboard',
        onNavigate: handleSidebarNavigation
      }}
      headerProps={{
        user,
        tenantId,
        searchQuery: '',
        onSearchChange: (query) => console.log('Search:', query),
        onSearch: () => console.log('Search submitted')
      }}
    >
    <div className="space-y-3 sm:space-y-4 pb-4">
        {/* Overview Section */}
        <FigmaOverview
          stats={{
            totalProducts,
            totalOrders,
            totalAmount: formattedAmount,
            lowStock,
            toReview
          }}
          currentLang={language}
          onLangChange={setLanguage}
        />

        {/* Visitor Stats + Analytics Bar Chart Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 px-3 sm:px-4 lg:px-6">
          {/* Visitor Stats - Left Side */}
          <div className="md:col-span-4 lg:col-span-3">
            <FigmaVisitorStats
              visitorStats={{
                onlineNow: 35,
                todayVisitors: 35,
                totalVisitors: 35
              }}
            />
          </div>

          {/* Analytics Bar Chart - Right Side */}
          <div className="md:col-span-8 lg:col-span-9">
            <FigmaAnalyticsChart
              timeFilter="December 2025"
              onTimeFilterChange={setTimeFilter}
            />
          </div>
        </div>

        {/* Order Status Row */}
        <FigmaOrderStatus
          orderStats={{
            pending: pendingOrders,
            confirmed: confirmedOrders,
            courier: courierOrders,
            delivered: deliveredOrders,
            canceled: canceledOrders,
            returns: returnsOrders
          }}
        />

        {/* Sales Performance + Sales by Category Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 px-3 sm:px-4 lg:px-6">
          {/* Sales Performance Chart - Left Side */}
          <div className="lg:col-span-8">
            <FigmaSalesPerformance />
          </div>

          {/* Sales by Category Pie Chart - Right Side */}
          <div className="lg:col-span-4">
            <FigmaSalesByCategory />
          </div>
        </div>

        {/* Best Selling Products + Top Products Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 px-3 sm:px-4 lg:px-6">
          {/* Best Selling Products Table - Left Side */}
          <div className="lg:col-span-8">
            <FigmaBestSellingProducts products={bestSellingData} />
          </div>

          {/* Top Products List - Right Side */}
          <div className="lg:col-span-4">
            <FigmaTopProducts products={topProductsData} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FigmaDashboardPage;

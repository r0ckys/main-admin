import React, { useCallback, useMemo, useState } from 'react';
import { normalizeImageUrl } from '../utils/imageUrlHelper';
import {
    ShoppingBag,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    PackageCheck,
    ArchiveRestore,
    LayoutGrid,
    TrendingUp,
    Download,
    Wallet,
    Calendar,
    ChevronDown,
    Eye,
    Users,
    MoreHorizontal,
    Globe,
    Wifi,
    Settings,
    Filter,
    ExternalLink,
    Play,
    Star,
    Package,
    MessageCircle,
    Search,
    Moon,
    Bell,
    RotateCw,
    FileText,
    TrendingDown,
    Smartphone,
    Tablet,
    Monitor
} from 'lucide-react';
import { Order, Product } from '../types';
import { useVisitorStats } from '../hooks/useVisitorStats';

// Chart default data types
type RevenueDataPoint = { name: string; sales: number; costs: number };
type ProfitDataPoint = { name: string; value: number };
type CategoryDataPoint = { name: string; value: number; color: string };

const ALLOWED_REVENUE_STATUSES: Array<Order['status']> = ['Pending', 'Confirmed', 'On Hold', 'Processing', 'Shipped', 'Sent to Courier', 'Delivered'];

const CATEGORY_COLORS = [
    { bg: '#8B5CF6', label: 'Hair care' },
    { bg: '#F97316', label: 'Serum' },
    { bg: '#FDE047', label: 'Cream' },
    { bg: '#EF4444', label: 'Home & kitchen' },
    { bg: '#84CC16', label: 'Lip care' },
    { bg: '#06B6D4', label: 'Air Conditioner' },
    { bg: '#EC4899', label: 'Skin care' },
];

const parseOrderDate = (dateString?: string) => {
    if (!dateString) return null;
    const direct = Date.parse(dateString);
    if (!Number.isNaN(direct)) return new Date(direct);
    const sanitized = Date.parse(dateString.replace(/,/g, ''));
    return Number.isNaN(sanitized) ? null : new Date(sanitized);
};

const buildMonthlyRevenueData = (orders: Order[]) => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);

    const labels = ['Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29'];

    return labels.map((name, index) => {
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + (index * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        let sales = 0;
        orders.forEach(order => {
            if (!ALLOWED_REVENUE_STATUSES.includes(order.status)) return;
            const orderDate = parseOrderDate(order.date);
            if (!orderDate || orderDate < weekStart || orderDate > weekEnd) return;
            sales += order.amount;
        });

        const costs = Math.round(sales * 0.6);

        return { name, sales, costs };
    });
};

const buildCategoryBreakdown = (orders: Order[], products: Product[]): CategoryDataPoint[] => {
    if (!orders.length) return [];

    const productById = new Map(products.map((product) => [product.id, product]));
    const productByName = new Map(products.map((product) => [product.name.toLowerCase(), product]));
    const totals: Record<string, number> = {};

    orders.forEach((order) => {
        if (!ALLOWED_REVENUE_STATUSES.includes(order.status)) return;
        const matchedProduct =
            (order.productId && productById.get(order.productId)) ||
            (order.productName ? productByName.get(order.productName.toLowerCase()) : undefined);
        const category = matchedProduct?.category || 'Other';
        totals[category] = (totals[category] || 0) + order.amount;
    });

    const dataset = Object.entries(totals)
        .map(([name, value], index) => ({
            name,
            value,
            color: CATEGORY_COLORS[index % CATEGORY_COLORS.length].bg
        }))
        .sort((a, b) => b.value - a.value);

    return dataset;
};

const exportOrdersToCsv = (orders: Order[]) => {
    if (typeof window === 'undefined' || !orders.length) return;
    const header = ['Order ID', 'Customer', 'Amount', 'Status', 'Date'];
    const rows = orders.map((order) => [order.id, order.customer, order.amount, order.status, order.date]);
    const csv = [header, ...rows]
        .map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
        .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dashboard-orders-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  tenantId?: string;
  user?: { name?: string; avatar?: string } | null;
  onManageBalance?: () => void;
  onExportData?: (orders: Order[]) => void;
  onCreatePayment?: () => void;
  onSearch?: (query: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  tenantId,
  user,
    onManageBalance,
  onExportData,
    onCreatePayment,
  onSearch
}) => {
    const [language, setLanguage] = useState<'Eng' | 'বাংলা'>('Eng');

    // Visitor stats
    const { stats: visitorStats, isLoading: visitorLoading } = useVisitorStats({
        tenantId,
        period: '7d',
        refreshInterval: 30000
    });

    // Calculate stats
    const totalOrders = orders.length;
    const today = new Date().toDateString();
    const todayOrders = useMemo(
        () => orders.filter((order) => {
            const parsed = parseOrderDate(order.date);
            return parsed && parsed.toDateString() === today;
        }).length,
        [orders, today]
    );

    const courierOrders = useMemo(() => orders.filter((order) => Boolean(order.courierProvider)).length, [orders]);
    const confirmedOrders = useMemo(() => orders.filter((order) => order.status === 'Confirmed').length, [orders]);
    const pendingOrders = useMemo(() => orders.filter((order) => order.status === 'Pending').length, [orders]);
    const cancelledOrders = useMemo(() => orders.filter((order) => order.status === 'Cancelled').length, [orders]);
    const returnsCount = useMemo(() => orders.filter((order) => order.status === 'Returned').length, [orders]);

    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.amount, 0), [orders]);
    const lowStockProducts = useMemo(() => products.filter(p => (p.stock || 0) < 10).length, [products]);
    const toBeReviewed = useMemo(() => orders.filter(o => o.status === 'Pending').length, [orders]);

    // Chart data
    const revenueData = useMemo(() => buildMonthlyRevenueData(orders), [orders]);
    const categoryData = useMemo(() => buildCategoryBreakdown(orders, products), [orders, products]);

    // Profit data
    const profitData = useMemo(() => {
        return revenueData.map(item => ({
            name: item.name,
            value: item.sales - item.costs
        }));
    }, [revenueData]);

    const totalProfit = useMemo(() => profitData.reduce((sum, item) => sum + item.value, 0), [profitData]);

    // Best selling products
    const bestSellingProducts = useMemo(() => {
        const productSales: Record<string, { product: Product; orders: number; revenue: number }> = {};

        orders.forEach(order => {
            if (!ALLOWED_REVENUE_STATUSES.includes(order.status)) return;
            const product = products.find(p => p.id === order.productId);
            if (product) {
                if (!productSales[product.id]) {
                    productSales[product.id] = { product, orders: 0, revenue: 0 };
                }
                productSales[product.id].orders++;
                productSales[product.id].revenue += order.amount;
            }
        });

        return Object.values(productSales)
            .sort((a, b) => b.orders - a.orders)
            .slice(0, 5);
    }, [orders, products]);

    // Top products for sidebar
    const topProducts = useMemo(() => products.slice(0, 5), [products]);

    const handleExport = useCallback(() => {
        if (onExportData) return onExportData(orders);
        exportOrdersToCsv(orders);
    }, [orders, onExportData]);

    // Get current day info
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const currentDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '/');

    return (
        <div className="bg-slate-50 min-h-screen p-4 md:p-6 lg:p-8 font-sans">
            {/* Top Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome back, {user?.name || 'Yuvraj'}</h1>
                    <p className="text-slate-500 mt-1">Monitor your business analytics and statistics.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                    {/* Actions */}
                    <div className="hidden md:flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 text-sm font-medium transition-colors">
                            <Globe className="w-4 h-4" />
                            <span>View Website</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 text-sm font-medium transition-colors">
                            <Play className="w-4 h-4 fill-slate-700" />
                            <span>Tutorials</span>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => onSearch?.(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                        />
                    </div>

                    {/* Icons & Profile */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                        <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                                <Moon className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full relative transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-slate-500 font-medium">Admin</p>
                                <p className="text-sm font-bold text-slate-900">{user?.name || 'Yuvraj'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">
                                        {user?.name?.charAt(0) || 'Y'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Column 1: Stacked Small Cards */}
                <div className="flex flex-col gap-6">
                    <SmallStatCard
                        value={products.length}
                        label="Products on Hands"
                        icon={<RotateCw className="w-5 h-5 text-purple-600" />}
                        bg="bg-purple-100/50"
                    />
                    <SmallStatCard
                        value={`$${totalRevenue.toLocaleString()}`}
                        label="Reserved Price"
                        icon={<TagIcon className="w-5 h-5 text-blue-600" />}
                        bg="bg-blue-100/50"
                    />
                </div>

                {/* Column 2: Stacked Small Cards */}
                <div className="flex flex-col gap-6">
                    <SmallStatCard
                        value={totalOrders}
                        label="Total Orders"
                        icon={<FileText className="w-5 h-5 text-orange-600" />}
                        bg="bg-orange-100/50"
                    />
                    <SmallStatCard
                        value={lowStockProducts}
                        label="Low Stock"
                        icon={<TrendingDown className="w-5 h-5 text-red-600" />}
                        bg="bg-red-100/50"
                    />
                </div>

                {/* Column 3: Language & Date & Reviewed */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm font-medium text-slate-500">Language</p>
                            <div className="flex bg-slate-100 rounded-lg p-1">
                                <button
                                    onClick={() => setLanguage('Eng')}
                                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${language === 'Eng' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                                >Eng</button>
                                <button
                                    onClick={() => setLanguage('বাংলা')}
                                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${language === 'বাংলা' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                                >বাংলা</button>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                            <div className="bg-purple-50 p-2 rounded-lg">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-900 leading-none">{currentDate}</p>
                                <p className="text-sm text-slate-500 mt-1">{currentDay}</p>
                            </div>
                        </div>
                    </div>
                    <SmallStatCard
                        value={toBeReviewed}
                        label="To be Reviewed"
                        icon={<PackageCheck className="w-5 h-5 text-teal-600" />}
                        bg="bg-teal-100/50"
                    />
                </div>

                {/* Column 4: Notification Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 opacity-90">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Notification</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">New Feature Available!</h3>
                        <p className="text-sm opacity-80 leading-relaxed">Check out the latest analytics tools added to your dashboard.</p>
                    </div>
                    <div className="flex gap-1 mt-4 relative z-10">
                         <span className="w-2 h-2 bg-white rounded-full opacity-100"></span>
                         <span className="w-2 h-2 bg-white rounded-full opacity-40"></span>
                         <span className="w-2 h-2 bg-white rounded-full opacity-40"></span>
                    </div>
                    {/* Decorative Image Placeholder */}
                    <img
                        src="https://illustrations.popsy.co/amber/surr-upgrade.svg"
                        className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12 filter contrast-200 brightness-200"
                        alt="notification"
                    />
                </div>
            </div>

            {/* Visitor Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Stats Cards Stack */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <VisitorCard
                        icon={<Wifi className="w-5 h-5 text-emerald-600" />}
                        title="Online Now"
                        subtitle="Active visitors on site"
                        value={visitorStats?.onlineNow || 35}
                        bg="bg-emerald-50 text-emerald-600"
                    />
                    <VisitorCard
                        icon={<Users className="w-5 h-5 text-blue-600" />}
                        title="Today visitors"
                        subtitle={`Last 7 days: ${visitorStats?.periodVisitors || 4}`}
                        value={visitorStats?.todayVisitors || 35}
                        bg="bg-blue-50 text-blue-600"
                    />
                    <VisitorCard
                        icon={<Globe className="w-5 h-5 text-violet-600" />}
                        title="Total visitors"
                        subtitle={`${visitorStats?.totalPageViews || 15} page view`}
                        value={visitorStats?.totalVisitors || 35}
                        bg="bg-violet-50 text-violet-600"
                    />
                </div>

                {/* Bar Chart (Replacing Units of Measure with Profit Data) */}
                <div className="lg:col-span-9 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Analytics</p>
                            <h3 className="text-lg font-bold text-slate-900">Visitors Overview</h3>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-slate-600">Desktop View</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                                <span className="text-slate-600">Mobile View</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex-1 min-h-[250px] flex items-end justify-between px-2 pt-10">
                        {/* Grid lines background */}
                        <div className="absolute inset-0 top-10 flex flex-col justify-between pointer-events-none">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full border-t border-slate-100 border-dashed h-full"></div>)}
                        </div>

                        {profitData.slice(0, 15).map((item, i) => {
                            const heightPercent = Math.max((item.value / (totalProfit * 0.2 || 1)) * 100, 15);
                            return (
                                <div key={i} className="relative z-10 flex flex-col items-center gap-3 w-full group">
                                    <div className="w-full max-w-[40px] h-[200px] flex items-end justify-center relative">
                                        <div
                                            className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                                            style={{ height: `${heightPercent}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                                ${item.value.toLocaleString()}
                                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                                            </div>
                                        </div>
                                        <div className="w-full absolute bottom-0 bg-slate-100 -z-10 h-full rounded-t-sm"></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-400 group-hover:text-slate-800 transition-colors">{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Order Status Pills */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Order Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatusPill icon={<ShoppingBag />} color="bg-pink-50 text-pink-600" label="Today" value={todayOrders} />
                    <StatusPill icon={<Truck />} color="bg-orange-50 text-orange-600" label="Courier" value={courierOrders} />
                    <StatusPill icon={<CheckCircle />} color="bg-green-50 text-green-600" label="Confirmed" value={confirmedOrders} />
                    <StatusPill icon={<Clock />} color="bg-amber-50 text-amber-600" label="Pending" value={pendingOrders} />
                    <StatusPill icon={<XCircle />} color="bg-red-50 text-red-600" label="Canceled" value={cancelledOrders} />
                    <StatusPill icon={<ArchiveRestore />} color="bg-blue-50 text-blue-600" label="Returns" value={returnsCount} />
                </div>
            </div>

            {/* Main Charts: Sales Performance & Category */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Line Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h3 className="text-lg font-bold text-slate-900">Sale Performance</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-slate-100 p-1 rounded-lg overflow-hidden">
                                {['Day', 'Month', 'Year', 'All Time'].map((t) => (
                                    <button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${t === 'Month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100">
                                December 2025
                                <Filter className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-sm font-medium text-slate-600">Placed Order</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                            <span className="text-sm font-medium text-slate-600">Order Delivered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="text-sm font-medium text-slate-600">Order Cancel</span>
                        </div>
                    </div>

                    <div className="relative h-[300px] w-full">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
                            {/* Grid */}
                            {[0, 1, 2, 3, 4].map(i => (
                                <line key={i} x1="0" y1={i * 75} x2="800" y2={i * 75} stroke="#F1F5F9" strokeWidth="1" />
                            ))}
                            {/* Labels Y */}
                            <text x="-30" y="10" className="fill-slate-400 text-xs">100</text>
                            <text x="-30" y="85" className="fill-slate-400 text-xs">75</text>
                            <text x="-30" y="160" className="fill-slate-400 text-xs">50</text>
                            <text x="-30" y="235" className="fill-slate-400 text-xs">25</text>
                            <text x="-30" y="300" className="fill-slate-400 text-xs">0</text>

                            {/* Paths */}
                            <path
                                d="M0,300 C100,200 200,280 300,180 S500,100 800,50"
                                fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"
                                className="drop-shadow-sm"
                            />
                            <path
                                d="M0,300 C150,250 250,220 400,230 S600,150 800,120"
                                fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round"
                                className="drop-shadow-sm"
                            />
                            <path
                                d="M0,300 C200,290 350,250 450,280 S650,280 800,280"
                                fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"
                                className="drop-shadow-sm"
                            />
                        </svg>
                        {/* X Axis */}
                        <div className="flex justify-between w-full mt-2">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <span key={i} className="text-xs text-slate-400">{i * 2 + 1}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Sale By Category</h3>

                    <div className="flex-1 flex items-center justify-center mb-6">
                        <div className="relative w-64 h-64">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                                {categoryData.length > 0 ? (
                                    (() => {
                                        const total = categoryData.reduce((sum, d) => sum + d.value, 0);
                                        let cumulativePercent = 0;
                                        return categoryData.slice(0, 7).map((item, index) => {
                                            const percent = (item.value / total) * 100;
                                            const dashArray = `${percent} ${100 - percent}`;
                                            const dashOffset = -cumulativePercent;
                                            cumulativePercent += percent;
                                            return (
                                                <circle
                                                    key={item.name}
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke={CATEGORY_COLORS[index % CATEGORY_COLORS.length].bg}
                                                    strokeWidth="12"
                                                    strokeDasharray={dashArray}
                                                    strokeDashoffset={dashOffset}
                                                    pathLength="100"
                                                    className="transition-all duration-1000 ease-out hover:opacity-80"
                                                />
                                            );
                                        });
                                    })()
                                ) : (
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                                )}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold text-slate-900">{categoryData.length}</span>
                                <span className="text-sm text-slate-500 font-medium">Categories</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {CATEGORY_COLORS.slice(0, 6).map((cat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.bg }}></span>
                                <span className="text-xs font-medium text-slate-600 truncate">{cat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Best Selling & Top Products */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Best Selling Table */}
                <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Best Selling Product</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                {['Day', 'Month', 'Year'].map((t) => (
                                    <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${t === 'Month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100">
                                Dec 2025
                                <Filter className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Order</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {(bestSellingProducts.length > 0 ? bestSellingProducts : products.slice(0, 4).map(p => ({ product: p, orders: Math.floor(Math.random() * 500) + 50, revenue: p.price || 0 }))).map((item, index) => (
                                    <tr key={index} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                                    {item.product.image ? (
                                                        <img src={normalizeImageUrl(item.product.image)} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package className="w-5 h-5 text-slate-400" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{item.product.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-600">{item.orders}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                                ${(item.product.stock || 0) > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${(item.product.stock || 0) > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                {(item.product.stock || 0) > 0 ? 'In Stock' : 'Stock Out'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm font-bold text-slate-900">${(item.product.price || 999).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <button className="w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                            View All Transactions
                        </button>
                    </div>
                </div>

                {/* Top Products List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">View All</button>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-4 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {topProducts.map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">
                                        {product.image ? (
                                            <img src={normalizeImageUrl(product.image)} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Package className="w-6 h-6 text-slate-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">{product.name}</p>
                                        <p className="text-xs text-slate-500">Item: #FXZ-{4567 + i}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-slate-900">${(product.price || 99).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TagIcon = ({className}:{className?:string}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
);

const SmallStatCard = ({ value, label, icon, bg }: { value: number | string, label: string, icon: React.ReactNode, bg: string }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1 flex items-center justify-between group hover:shadow-md transition-all">
        <div>
            <p className="text-2xl font-bold text-slate-900 leading-tight mb-1">{value}</p>
            <p className="text-sm font-medium text-slate-500">{label}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${bg}`}>
            {icon}
        </div>
    </div>
);

const VisitorCard = ({ icon, title, subtitle, value, bg }: { icon: React.ReactNode, title: string, subtitle: string, value: number | string, bg: string }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                {icon}
            </div>
            <div>
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
        <div className="text-lg font-bold text-slate-900">{value}</div>
    </div>
);

const StatusPill = ({ icon, color, label, value }: { icon: React.ReactNode, color: string, label: string, value: number }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all flex items-center gap-4 group">
        <div className={`p-2.5 rounded-lg transition-transform group-hover:scale-110 ${color.replace('text-', 'bg-').replace('50', '100')} ${color.split(' ')[1]}`}>
            {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
        </div>
        <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">{label}</p>
            <p className="text-lg font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

export default AdminDashboard;
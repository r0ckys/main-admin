import React from 'react';
import {
  Globe,
  PlayCircle,
  Search,
  Moon,
  MessageCircle,
  Bell,
  ChevronDown
} from 'lucide-react';
import { DashboardHeaderProps } from './types';

const FigmaDashboardHeader: React.FC<DashboardHeaderProps> = ({
  tenantId,
  user,
  searchQuery,
  onSearchChange,
  onSearch
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
        {/* Welcome Section */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome back, {user?.name || 'Yuvraj'}
          </h1>
          <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Monitor your business analytics and statistics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
          {/* View Website Button */}
          <a
            href={tenantId ? `/${tenantId}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>View Website</span>
          </a>

          {/* Tutorials Button */}
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <PlayCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Tutorials</span>
          </button>

          {/* Search Bar */}
          <div className="relative flex items-center bg-gray-50 rounded-lg px-4 py-2 w-64 lg:w-72 border border-gray-100">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="bg-transparent flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <Moon className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all relative">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center">5</span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Admin</div>
              <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{user?.name || 'Yuvraj'}</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-white">
                  {(user?.name || 'Y').charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaDashboardHeader;

import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import FigmaDashboardHeader from './FigmaDashboardHeader';
import { SidebarProps, DashboardHeaderProps } from './types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarProps?: Partial<SidebarProps>;
  headerProps?: DashboardHeaderProps;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarProps = {},
  headerProps = {},
  className = ""
}) => {
  return (
    <div className={`flex min-h-screen bg-[#F8FAFC] ${className}`}>
      {/* Sidebar */}
      <div className="flex-shrink-0 w-[250px] bg-white shadow-sm border-r border-gray-100">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                System Next IT
              </span>
            </div>
          </div>
          <DashboardSidebar
            {...sidebarProps}
            className="p-4"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0">
          <FigmaDashboardHeader
            {...headerProps}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

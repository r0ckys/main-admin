import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Widget, WidgetSidebarProps, WidgetType } from './types';

export const DEFAULT_WIDGETS: Widget[] = [
  { id: 'header', label: 'Header', icon: '🏠', description: 'Navigation and logo area', defaultConfig: { backgroundColor: '#ffffff', padding: '16px', fullWidth: true } },
  { id: 'hero-slider', label: 'Hero Slider', icon: '🖼️', description: 'Full-width image carousel', defaultConfig: { fullWidth: true, maxItems: 5 } },
  { id: 'product-grid', label: 'Product Grid', icon: '📦', description: 'Display products in a grid layout', defaultConfig: { columns: 4, maxItems: 12, padding: '24px' } },
  { id: 'categories', label: 'Categories', icon: '📁', description: 'Product category navigation', defaultConfig: { columns: 4, maxItems: 8 } },
  { id: 'featured-products', label: 'Featured Products', icon: '⭐', description: 'Highlight special products', defaultConfig: { columns: 3, maxItems: 6, backgroundColor: '#f9fafb' } },
  { id: 'banner', label: 'Banner', icon: '🎯', description: 'Promotional banner section', defaultConfig: { fullWidth: true, textAlign: 'center' } },
  { id: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Customer reviews and feedback', defaultConfig: { columns: 3, maxItems: 3, backgroundColor: '#f3f4f6' } },
  { id: 'newsletter', label: 'Newsletter', icon: '📧', description: 'Email subscription form', defaultConfig: { textAlign: 'center', padding: '32px', backgroundColor: '#1f2937' } },
  { id: 'footer', label: 'Footer', icon: '📋', description: 'Site footer with links', defaultConfig: { fullWidth: true, backgroundColor: '#111827' } },
];

interface DraggableWidgetCardProps {
  widget: Widget;
  onAddWidget?: (widget: Widget) => void;
}

const DraggableWidgetCard: React.FC<DraggableWidgetCardProps> = ({ widget, onAddWidget }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `widget-${widget.id}`,
    data: { type: 'widget', widgetType: widget.id as WidgetType, widget },
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className={`p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all duration-200 ${isDragging ? 'border-blue-500 bg-blue-50 shadow-lg scale-105 opacity-50' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{widget.icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm">{widget.label}</h4>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{widget.description}</p>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onAddWidget?.(widget); }} className="mt-2 w-full py-1.5 text-xs font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded transition-colors">+ Add to Canvas</button>
    </div>
  );
};

export const WidgetSidebar: React.FC<WidgetSidebarProps> = ({ widgets = DEFAULT_WIDGETS, onAddWidget }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredWidgets = widgets.filter((widget) => widget.label.toLowerCase().includes(searchQuery.toLowerCase()) || widget.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Widgets</h2>
        <p className="text-xs text-gray-500 mt-1">Drag widgets to the canvas or click to add</p>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input type="text" placeholder="Search widgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredWidgets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No widgets found</p>
            <button onClick={() => setSearchQuery('')} className="text-blue-600 text-sm mt-2 hover:underline">Clear search</button>
          </div>
        ) : (
          <div className="space-y-3">{filteredWidgets.map((widget) => (<DraggableWidgetCard key={widget.id} widget={widget} onAddWidget={onAddWidget} />))}</div>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          <p><strong>Tip:</strong> Drag and drop widgets to reorder them. Click the edit icon to customize each section.</p>
        </div>
      </div>
    </aside>
  );
};

export default WidgetSidebar;

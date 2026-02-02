import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DraggableSectionProps, WidgetType } from './types';

const getWidgetIcon = (type: WidgetType): string => {
  const icons: Record<WidgetType, string> = {
    'header': '🏠', 'hero-slider': '🖼️', 'product-grid': '📦',
    'categories': '📁', 'featured-products': '⭐', 'banner': '🎯',
    'testimonials': '💬', 'newsletter': '📧', 'footer': '📋',
  };
  return icons[type] || '📦';
};

const getWidgetLabel = (type: WidgetType): string => {
  const labels: Record<WidgetType, string> = {
    'header': 'Header', 'hero-slider': 'Hero Slider', 'product-grid': 'Product Grid',
    'categories': 'Categories', 'featured-products': 'Featured Products', 'banner': 'Banner',
    'testimonials': 'Testimonials', 'newsletter': 'Newsletter', 'footer': 'Footer',
  };
  return labels[type] || type;
};

export const DraggableSection: React.FC<DraggableSectionProps> = ({
  section, onEdit, onDelete, onToggleVisibility,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: section.id,
    data: { type: 'section', section },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative group bg-white rounded-lg border-2 ${isDragging ? 'border-blue-500 shadow-2xl' : 'border-gray-200 hover:border-blue-300'} ${!section.visible ? 'opacity-60' : ''} transition-all duration-200 mb-3`}>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-t-lg border-b border-gray-200">
        <div {...attributes} {...listeners} className={`flex items-center gap-2 cursor-grab active:cursor-grabbing px-2 py-1 rounded hover:bg-gray-200 transition-colors`} title="Drag to reorder">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
          <span className="text-lg">{getWidgetIcon(section.type)}</span>
          <span className="font-medium text-gray-700">{getWidgetLabel(section.type)}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); onToggleVisibility?.(section.id); }} className={`p-1.5 rounded transition-colors ${section.visible ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-200' : 'text-red-500 hover:text-red-700 hover:bg-red-100'}`} title={section.visible ? 'Hide section' : 'Show section'}>
            {section.visible ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
            )}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onEdit?.(section); }} className="p-1.5 rounded text-gray-500 hover:text-blue-600 hover:bg-blue-100 transition-colors" title="Edit section settings">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete?.(section.id); }} className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-red-100 transition-colors" title="Delete section">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      <div className={`p-4 min-h-[80px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${!section.visible ? 'grayscale' : ''}`}>
        <div className="text-center">
          <span className="text-3xl mb-2 block">{getWidgetIcon(section.type)}</span>
          <p className="text-sm text-gray-500">{getWidgetLabel(section.type)} Section</p>
        </div>
      </div>
      {!section.visible && <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Hidden</div>}
    </div>
  );
};

export default DraggableSection;

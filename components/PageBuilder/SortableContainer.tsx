import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { DraggableSection } from './DraggableSection';
import type { SortableContainerProps, DevicePreview } from './types';

const DEVICE_WIDTHS: Record<DevicePreview, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export const SortableContainer: React.FC<SortableContainerProps> = ({
  sections, devicePreview, onEditSection, onDeleteSection, onToggleVisibility,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas-droppable',
    data: { type: 'canvas', accepts: ['widget', 'section'] },
  });

  const sectionIds = sections.map((section) => section.id);
  const containerWidth = DEVICE_WIDTHS[devicePreview];

  return (
    <div className="flex-1 bg-gray-100 overflow-auto p-6">
      <div className="mx-auto transition-all duration-300" style={{ maxWidth: containerWidth, width: '100%' }}>
        <div className="bg-gray-800 text-white text-center py-2 rounded-t-lg text-sm">
          <span className="font-medium">{devicePreview.charAt(0).toUpperCase() + devicePreview.slice(1)} Preview</span>
          <span className="text-gray-400 ml-2">({DEVICE_WIDTHS[devicePreview]})</span>
        </div>
        <div ref={setNodeRef} className={`min-h-[600px] bg-white rounded-b-lg shadow-lg border-2 transition-colors duration-200 ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
          {sections.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-[600px] ${isOver ? 'bg-blue-50' : 'bg-gray-50'} transition-colors duration-200`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${isOver ? 'bg-blue-100' : 'bg-gray-200'}`}>
                <svg className={`w-12 h-12 ${isOver ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">{isOver ? 'Drop here to add' : 'No sections added yet'}</h3>
              <p className="text-sm text-gray-500 text-center max-w-[300px]">{isOver ? 'Release to add this widget to your layout' : 'Drag widgets from the sidebar to start building your storefront layout'}</p>
            </div>
          ) : (
            <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
              <div className="p-4">
                {isOver && <div className="h-2 bg-blue-400 rounded-full mb-3 animate-pulse" />}
                {sections.map((section) => (
                  <DraggableSection key={section.id} section={section} onEdit={onEditSection} onDelete={onDeleteSection} onToggleVisibility={onToggleVisibility} />
                ))}
                {isOver && sections.length > 0 && <div className="h-2 bg-blue-400 rounded-full mt-3 animate-pulse" />}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
      <div className="text-center mt-4 text-sm text-gray-500">
        <p>💡 Tip: Drag sections by their handle to reorder. Use the preview toggle to see how your layout looks on different devices.</p>
      </div>
    </div>
  );
};

export default SortableContainer;

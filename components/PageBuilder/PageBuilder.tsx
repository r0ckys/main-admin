import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { SortableContainer } from './SortableContainer';
import { WidgetSidebar, DEFAULT_WIDGETS } from './WidgetSidebar';
import type { PageBuilderProps, Section, TenantLayout, DevicePreview, Widget, SaveLayoutPayload, DragData, WidgetType } from './types';

const API_BASE_URL = '/api/v1';
const SAVE_DEBOUNCE_MS = 2000;

export const PageBuilder: React.FC<PageBuilderProps> = ({ tenantId, initialLayout, onSaveSuccess, onError }) => {
  const [sections, setSections] = useState<Section[]>(initialLayout?.sections || []);
  const [layoutVersion, setLayoutVersion] = useState<number>(initialLayout?.version || 1);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<DragData | null>(null);
  const [devicePreview, setDevicePreview] = useState<DevicePreview>('desktop');
  const [isLoading, setIsLoading] = useState<boolean>(!initialLayout);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchLayout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/layout/${tenantId}`);
      if (!response.ok) throw new Error(`Failed to fetch layout: ${response.statusText}`);
      const result = await response.json();
      if (result.success && result.data) {
        setSections(result.data.sections || []);
        setLayoutVersion(result.data.version || 1);
        setLastSaved(new Date(result.data.lastUpdated));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load layout';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [tenantId, onError]);

  useEffect(() => { if (!initialLayout) fetchLayout(); }, [fetchLayout, initialLayout]);

  const saveLayout = useCallback(async (sectionsToSave: Section[]) => {
    setIsSaving(true);
    setError(null);
    const payload: SaveLayoutPayload = { sections: sectionsToSave, metadata: { isPublished: false }, version: layoutVersion };
    try {
      const response = await fetch(`${API_BASE_URL}/layout/${tenantId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.status === 409) { setError('Layout was modified by another user. Please refresh to see changes.'); return; }
      if (!response.ok) throw new Error(`Failed to save layout: ${response.statusText}`);
      const result = await response.json();
      if (result.success) { setLayoutVersion((prev) => prev + 1); setLastSaved(new Date()); setHasUnsavedChanges(false); onSaveSuccess?.(result.data); }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save layout';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally { setIsSaving(false); }
  }, [tenantId, layoutVersion, onSaveSuccess, onError]);

  const debouncedSave = useCallback((sectionsToSave: Section[]) => {
    setHasUnsavedChanges(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => { saveLayout(sectionsToSave); }, SAVE_DEBOUNCE_MS);
  }, [saveLayout]);

  useEffect(() => { return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); }; }, []);

  const handleManualSave = useCallback(() => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); saveLayout(sections); }, [saveLayout, sections]);

  const handleDragStart = (event: DragStartEvent) => { setActiveId(event.active.id as string); setActiveDragData(event.active.data.current as DragData); };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveDragData(null);
    if (!over) return;
    const dragData = active.data.current as DragData;

    if (dragData.type === 'widget' && dragData.widgetType) {
      const widget = DEFAULT_WIDGETS.find((w) => w.id === dragData.widgetType);
      if (!widget) return;
      const newSection: Section = { id: uuidv4(), type: dragData.widgetType, order: sections.length, visible: true, config: { ...widget.defaultConfig }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      let insertIndex = sections.length;
      if (over.id !== 'canvas-droppable') { const overIndex = sections.findIndex((s) => s.id === over.id); if (overIndex !== -1) insertIndex = overIndex; }
      const updatedSections = [...sections];
      updatedSections.splice(insertIndex, 0, newSection);
      const reorderedSections = updatedSections.map((section, index) => ({ ...section, order: index, updatedAt: new Date().toISOString() }));
      setSections(reorderedSections);
      debouncedSave(reorderedSections);
      return;
    }

    if (dragData.type === 'section' && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const reorderedSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({ ...section, order: index, updatedAt: new Date().toISOString() }));
      setSections(reorderedSections);
      debouncedSave(reorderedSections);
    }
  };

  const handleAddWidget = (widget: Widget) => {
    const newSection: Section = { id: uuidv4(), type: widget.id as WidgetType, order: sections.length, visible: true, config: { ...widget.defaultConfig }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    debouncedSave(updatedSections);
  };

  const handleEditSection = (section: Section) => { console.log('Edit section:', section); };

  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = sections.filter((s) => s.id !== sectionId).map((section, index) => ({ ...section, order: index, updatedAt: new Date().toISOString() }));
    setSections(updatedSections);
    debouncedSave(updatedSections);
  };

  const handleToggleVisibility = (sectionId: string) => {
    const updatedSections = sections.map((section) => section.id === sectionId ? { ...section, visible: !section.visible, updatedAt: new Date().toISOString() } : section);
    setSections(updatedSections);
    debouncedSave(updatedSections);
  };

  const renderDragOverlay = () => {
    if (!activeId || !activeDragData) return null;
    if (activeDragData.type === 'widget') {
      const widget = DEFAULT_WIDGETS.find((w) => w.id === activeDragData.widgetType);
      if (!widget) return null;
      return (<div className="bg-white p-4 rounded-lg shadow-2xl border-2 border-blue-500 opacity-90"><div className="flex items-center gap-3"><span className="text-2xl">{widget.icon}</span><div><p className="font-medium text-gray-900">{widget.label}</p><p className="text-xs text-gray-500">Drop to add</p></div></div></div>);
    }
    if (activeDragData.type === 'section') {
      const section = sections.find((s) => s.id === activeId);
      if (!section) return null;
      return (<div className="bg-white p-4 rounded-lg shadow-2xl border-2 border-blue-500 opacity-90 w-64"><div className="flex items-center gap-3"><span className="text-2xl">{DEFAULT_WIDGETS.find((w) => w.id === section.type)?.icon || '📦'}</span><div><p className="font-medium text-gray-900">{DEFAULT_WIDGETS.find((w) => w.id === section.type)?.label || section.type}</p><p className="text-xs text-gray-500">Reordering...</p></div></div></div>);
    }
    return null;
  };

  if (isLoading) {
    return (<div className="flex items-center justify-center h-screen bg-gray-100"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" /><p className="text-gray-600">Loading page builder...</p></div></div>);
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Store Studio</h1>
            <span className="text-sm text-gray-500">Tenant: <code className="bg-gray-100 px-2 py-0.5 rounded">{tenantId}</code></span>
            <div className="flex items-center gap-2 text-sm">
              {isSaving ? (<span className="text-blue-600 flex items-center gap-1"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Saving...</span>) : hasUnsavedChanges ? (<span className="text-amber-600">● Unsaved changes</span>) : lastSaved ? (<span className="text-green-600">✓ Saved</span>) : null}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {(['desktop', 'tablet', 'mobile'] as DevicePreview[]).map((device) => (
              <button key={device} onClick={() => setDevicePreview(device)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${devicePreview === device ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                {device === 'desktop' && '🖥️ Desktop'}{device === 'tablet' && '📱 Tablet'}{device === 'mobile' && '📲 Mobile'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleManualSave} disabled={isSaving || !hasUnsavedChanges} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${hasUnsavedChanges && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Save Changes</button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-900 transition-colors">Preview Store</button>
          </div>
        </div>
        {error && (<div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between"><p className="text-sm text-red-700">{error}</p><button onClick={() => setError(null)} className="text-red-500 hover:text-red-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>)}
      </header>
      <div className="flex-1 flex overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <WidgetSidebar widgets={DEFAULT_WIDGETS} onAddWidget={handleAddWidget} />
          <SortableContainer sections={sections} devicePreview={devicePreview} onEditSection={handleEditSection} onDeleteSection={handleDeleteSection} onToggleVisibility={handleToggleVisibility} />
          <DragOverlay dropAnimation={null}>{renderDragOverlay()}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default PageBuilder;

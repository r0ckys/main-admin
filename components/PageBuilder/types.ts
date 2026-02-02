/**
 * PAGE BUILDER TYPE DEFINITIONS
 */

export type WidgetType = 
  | 'header'
  | 'hero-slider'
  | 'product-grid'
  | 'categories'
  | 'featured-products'
  | 'banner'
  | 'testimonials'
  | 'newsletter'
  | 'footer';

export type DevicePreview = 'desktop' | 'tablet' | 'mobile';

export interface Widget {
  id: WidgetType;
  label: string;
  icon: string;
  description: string;
  defaultConfig: WidgetConfig;
}

export interface WidgetConfig {
  backgroundColor?: string;
  padding?: string;
  textAlign?: 'left' | 'center' | 'right';
  columns?: number;
  maxItems?: number;
  fullWidth?: boolean;
  customClasses?: string;
  [key: string]: unknown;
}

export interface Section {
  id: string;
  type: WidgetType;
  order: number;
  visible: boolean;
  config: WidgetConfig;
  createdAt: string;
  updatedAt: string;
}

export interface TenantLayout {
  tenantId: string;
  sections: Section[];
  metadata: LayoutMetadata;
  version: number;
  lastUpdated: string;
}

export interface LayoutMetadata {
  name: string;
  isPublished: boolean;
  lastModifiedBy?: string;
  themeId?: string;
}

export interface SaveLayoutPayload {
  sections: Section[];
  metadata: Partial<LayoutMetadata>;
  version: number;
}

export interface LayoutApiResponse {
  success: boolean;
  data?: TenantLayout;
  error?: string;
  message?: string;
}

export interface DraggableSectionProps {
  section: Section;
  isDragging?: boolean;
  isOver?: boolean;
  onEdit?: (section: Section) => void;
  onDelete?: (sectionId: string) => void;
  onToggleVisibility?: (sectionId: string) => void;
}

export interface SortableContainerProps {
  sections: Section[];
  devicePreview: DevicePreview;
  onEditSection?: (section: Section) => void;
  onDeleteSection?: (sectionId: string) => void;
  onToggleVisibility?: (sectionId: string) => void;
}

export interface WidgetSidebarProps {
  widgets: Widget[];
  onAddWidget?: (widget: Widget) => void;
}

export interface PageBuilderProps {
  tenantId: string;
  initialLayout?: TenantLayout;
  onSaveSuccess?: (layout: TenantLayout) => void;
  onError?: (error: Error) => void;
}

export interface DragData {
  type: 'widget' | 'section';
  widgetType?: WidgetType;
  sectionId?: string;
}

import type { SetRequired } from 'type-fest';
import type { HierarchyData, WidgetConfigs } from '../imports.types';

export type HierarchyWidget = SetRequired<
  HierarchyData<WidgetConfigs>,
  'payload'
>;

export interface MenuItemOptions {
  primary: string;
  secondary?: string;
  value: string;
}

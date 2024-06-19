import { Children } from 'react';

import type {
  ConfigPaths,
  RenderConfig,
  EditorListClasses,
  EditorListProps,
} from '../imports.types';

export type ChildrenArray = ReturnType<typeof Children.toArray>;

export interface NodePaths {
  nodePaths: string[];
  onWidgetChildrenGenerate: (config: RenderConfig) => RenderConfig[];

  onPathsGenerate: (
    nodePath: string,
    index: number,
    paths?: ConfigPaths
  ) => ConfigPaths;
}

interface StructureEvent {
  target: RenderConfig;
  paths: ConfigPaths;
}

//* Component Props
export interface ElementNodeListProps
  extends Pick<EditorListProps, 'onClose'>,
    ActionProps<'active'> {
  onActive: (e: ConfigPaths) => void;
}

export type ActionProps<P extends string = 'paths'> = Record<P, ConfigPaths> & {
  config: RenderConfig;
  onDelete: (e: StructureEvent) => void;
  onEdit: (e: StructureEvent) => void;
};

export interface ItemsProps
  extends Pick<
    ElementNodeListProps,
    'active' | 'onActive' | 'onDelete' | 'onEdit'
  > {
  classes: EditorListClasses;
  config: RenderConfig;
}

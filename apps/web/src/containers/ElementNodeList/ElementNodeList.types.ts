import type {
  ConfigPaths,
  ComponentConfig,
  EditorListClasses,
  EditorListProps,
} from '../imports.types';

export interface NodePaths {
  nodePaths: string[];
  onWidgetChildrenGenerate: (config: ComponentConfig) => ComponentConfig[];

  onPathsGenerate: (
    nodePath: string,
    index: number,
    paths?: ConfigPaths
  ) => ConfigPaths;
}

export interface ChildNodeGroup {
  path: string;
  chidlren: ComponentConfig[];
  showIndex: boolean;
}

interface StructureEvent {
  target: ComponentConfig;
  paths: ConfigPaths;
}

//* Component Props
export interface ElementNodeListProps
  extends Pick<EditorListProps, 'onClose'>,
    ActionProps<'active'> {
  onActive: (e: ConfigPaths) => void;
}

export type ActionProps<P extends string = 'paths'> = Record<P, ConfigPaths> & {
  config: ComponentConfig;
  onDelete: (e: StructureEvent) => void;
  onEdit: (e: StructureEvent) => void;
};

export interface ItemsProps
  extends Pick<
    ElementNodeListProps,
    'active' | 'onActive' | 'onDelete' | 'onEdit'
  > {
  classes: EditorListClasses;
  config: ComponentConfig;
}

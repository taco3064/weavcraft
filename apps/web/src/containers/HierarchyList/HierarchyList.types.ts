import type Core from '@weavcraft/core';
import type { ContainerProps } from '@mui/material/Container';
import type { DndContextProps } from '@dnd-kit/core';
import type { ReactNode } from 'react';

import type {
  HierarchyData,
  PortalContainerEl,
  SearchHierarchyParams,
  SuperiorHierarchy,
} from '../imports.types';

//* Variables
export type MutationMode = 'create' | 'update' | 'delete';

export type SuperiorMutationHook = <P>(
  options: Required<
    Pick<
      HierarchyListProps<P>,
      'initialData' | 'superiors' | 'onMutationSuccess'
    >
  >
) => {
  isDragging: boolean;
  ids: Record<'fab' | 'group', string>;
  contextProps: DndContextProps;
};

export type UpsertedData<P> = Omit<
  Partial<HierarchyData<P>>,
  'category' | 'type'
> &
  Pick<HierarchyData<P>, 'category' | 'type'>;

export type UpsertedState<P> = Pick<
  UpsertDialogProps<P>,
  'data' | 'icon' | 'title'
>;

export type BodyScrollDeviation = null | {
  hasLeft: boolean;
  defaults: number;
  start: number;
  value: number;
};

//* Component Props
type MuiContainerProps = Pick<ContainerProps, 'disableGutters' | 'maxWidth'>;

export interface HierarchyListProps<P> extends MuiContainerProps {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  icon: Core.IconCode;
  initialData?: HierarchyData<P>[];
  superiors: SuperiorHierarchy[];
  toolbarEl?: PortalContainerEl;
  renderContent?: (payload?: P) => ReactNode;
  onMutationSuccess?: (mode: MutationMode, item: HierarchyData<P>) => void;
}

export interface HierarchyListSkeletonProps extends MuiContainerProps {
  cols: number;
}

export interface HierarchyListItemProps<P>
  extends Pick<HierarchyListProps<P>, 'icon' | 'renderContent'> {
  cols: number;
  data: HierarchyData<P>;
  disableDrag?: boolean;
  onDeleteConfirm?: (e: HierarchyData<P>) => void;
  onEditClick?: (e: UpsertedState<P>) => void;
  onPublishClick?: (e: HierarchyData<P>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HierarchyToolbarProps<P = any>
  extends Pick<
    HierarchyListProps<P>,
    'category' | 'disableGroup' | 'toolbarEl'
  > {
  children?: ReactNode;
  superior?: string;
  onAdd: (e: UpsertedState<P>) => void;
}

export interface FilterToggleProps {
  containerEl: PortalContainerEl;
  renderKey: string;
  values: SearchHierarchyParams;
  onSearch: (e: SearchHierarchyParams) => void;
}

export interface MoveToParentFolderFabProps {
  className?: string;
  disabled: boolean;
  id: string;
}

export interface UpsertDialogProps<P> {
  data?: UpsertedData<P>;
  icon?: Core.IconCode;
  title?: string;
  onClose: () => void;

  onSuccess: (
    mode: Extract<MutationMode, 'create' | 'update'>,
    item: HierarchyData<P>
  ) => void;
}

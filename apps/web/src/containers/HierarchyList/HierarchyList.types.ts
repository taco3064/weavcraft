import type { ContainerProps } from '@mui/material/Container';
import type { ElementType, ReactNode } from 'react';
import type { IconCode } from '@weavcraft/core';

import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { PortalContainerEl } from '~web/components';

//* Variables
export type MutationMode = 'create' | 'update' | 'delete';

export type UpsertedData<P> = Pick<
  HierarchyData<string, P>,
  'category' | 'type'
> &
  Omit<
    HierarchyData<string, P> | Partial<HierarchyData<undefined, P>>,
    'category' | 'type'
  >;

export type UpsertedState<P> = Pick<
  UpsertDialogProps<P>,
  'data' | 'icon' | 'title'
>;

//* Component Props
type MuiContainerProps = Pick<ContainerProps, 'disableGutters' | 'maxWidth'>;

export interface HierarchyListProps<P> extends MuiContainerProps {
  PreviewComponent?: ElementType<{ payload: P }>;
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  icon: IconCode;
  initialData?: HierarchyData<string, P>[];
  superior?: string;
  toolbarEl?: PortalContainerEl;

  onMutationSuccess?: (
    mode: MutationMode,
    item: HierarchyData<string, P>
  ) => void;
}

export interface HierarchyListSkeletonProps extends MuiContainerProps {
  cols: number;
}

export interface HierarchyListItemProps<P>
  extends Pick<HierarchyListProps<P>, 'PreviewComponent' | 'icon'> {
  cols: number;
  data: HierarchyData<string, P>;
  disableDrag?: boolean;
  selected?: boolean;
  onDeleteConfirm?: (e: HierarchyData<string, P>) => void;
  onEditClick?: (e: UpsertedState<P>) => void;
  onPublishClick?: (e: HierarchyData<string, P>) => void;
  onSelect?: (isSelected: boolean, data: HierarchyData<string, P>) => void;
}

export interface HierarchyToolbarProps<P = any>
  extends Pick<
    HierarchyListProps<P>,
    'category' | 'disableGroup' | 'superior' | 'toolbarEl'
  > {
  children?: ReactNode;
  onAdd: (e: UpsertedState<P>) => void;
  onMoveToSuperiorFolder?: () => void;
}

export interface FilterToggleProps {
  containerEl: PortalContainerEl;
  renderKey: string;
  values: SearchHierarchyParams;
  onSearch: (e: SearchHierarchyParams) => void;
}

export interface UpsertDialogProps<P> {
  data?: UpsertedData<P>;
  icon?: IconCode;
  title?: string;
  onClose: () => void;

  onSuccess: (
    mode: Extract<MutationMode, 'create' | 'update'>,
    item: HierarchyData<string>
  ) => void;
}

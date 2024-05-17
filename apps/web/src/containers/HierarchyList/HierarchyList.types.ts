import type Core from '@weavcraft/core';
import type { ContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { PortalContainerEl } from '~web/contexts';

//* Variables
export type MutationMode = 'create' | 'update' | 'delete';

export type UpsertedData<P> = Omit<
  Partial<HierarchyData<P>>,
  'category' | 'type'
> &
  Pick<HierarchyData<P>, 'category' | 'type'>;

export type UpsertedState<P> = Pick<
  UpsertDialogProps<P>,
  'data' | 'icon' | 'title'
>;

//* Component Props
type MuiContainerProps = Pick<ContainerProps, 'disableGutters' | 'maxWidth'>;

export interface HierarchyListProps<P> extends MuiContainerProps {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  icon: Core.IconCode;
  initialData?: HierarchyData<P>[];
  superior?: string;
  toolbarEl?: PortalContainerEl;
  renderPreview?: (payload?: P) => ReactNode;
  onMutationSuccess?: (mode: MutationMode, item: HierarchyData<P>) => void;
}

export interface HierarchyListSkeletonProps extends MuiContainerProps {
  cols: number;
}

export interface HierarchyListItemProps<P>
  extends Pick<HierarchyListProps<P>, 'icon' | 'renderPreview'> {
  cols: number;
  data: HierarchyData<P>;
  disableDrag?: boolean;
  selected?: boolean;
  onDeleteConfirm?: (e: HierarchyData<P>) => void;
  onEditClick?: (e: UpsertedState<P>) => void;
  onPublishClick?: (e: HierarchyData<P>) => void;
  onSelect?: (isSelected: boolean, data: HierarchyData<P>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  icon?: Core.IconCode;
  title?: string;
  onClose: () => void;

  onSuccess: (
    mode: Extract<MutationMode, 'create' | 'update'>,
    item: HierarchyData<P>
  ) => void;
}

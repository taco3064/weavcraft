import type { ContainerProps } from '@mui/material/Container';
import type { IconCode } from '@weavcraft/core';
import type { ReactNode } from 'react';

import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { PortalContainerEl } from '~web/components';

//* Variables
export type MutationMode = 'create' | 'update' | 'delete';

export type UpsertedData = Pick<HierarchyData<string>, 'category' | 'type'> &
  Omit<
    HierarchyData<string> | Partial<HierarchyData<undefined>>,
    'category' | 'type'
  >;

export type UpsertedState = Pick<UpsertDialogProps, 'data' | 'icon' | 'title'>;

//* Component Props
type MuiContainerProps = Pick<ContainerProps, 'disableGutters' | 'maxWidth'>;

export interface HierarchyListProps extends MuiContainerProps {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  icon: IconCode;
  initialData?: HierarchyData<string>[];
  superior?: string;
  toolbarEl?: PortalContainerEl;
  onMutationSuccess?: (mode: MutationMode, item: HierarchyData<string>) => void;
}

export interface HierarchyListSkeletonProps extends MuiContainerProps {
  cols: number;
}

export interface HierarchyListItemProps
  extends Pick<HierarchyListProps, 'icon'> {
  cols: number;
  data: HierarchyData<string>;
  disableDrag?: boolean;
  selected?: boolean;
  onDeleteConfirm?: (e: HierarchyData<string>) => void;
  onEditClick?: (e: UpsertedState) => void;
  onPublishClick?: (e: HierarchyData<string>) => void;
  onSelect?: (isSelected: boolean, data: HierarchyData<string>) => void;
}

export interface HierarchyToolbarProps
  extends Pick<HierarchyListProps, 'category' | 'disableGroup' | 'toolbarEl'> {
  children?: ReactNode;
  onAdd: (e: UpsertedState) => void;
  onMoveToSuperiorFolder?: () => void;
}

export interface FilterToggleProps {
  containerEl: PortalContainerEl;
  renderKey: string;
  values: SearchHierarchyParams;
  onSearch: (e: SearchHierarchyParams) => void;
}

export interface UpsertDialogProps {
  data?: UpsertedData;
  icon?: IconCode;
  title?: string;
  onClose: () => void;

  onSuccess?: (
    mode: Extract<MutationMode, 'create' | 'update'>,
    item: HierarchyData<string>
  ) => void;
}

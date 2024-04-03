import type { ContainerProps } from '@mui/material/Container';
import type { IconCode } from '@weavcraft/core';

import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { PortalContainerEl } from '~web/components';

export type MutationMode = 'create' | 'update' | 'delete';

export type UpsertedData = Pick<HierarchyData<string>, 'category' | 'type'> &
  Omit<
    HierarchyData<string> | Partial<HierarchyData<undefined>>,
    'category' | 'type'
  >;

export type UpsertedState = Pick<UpsertModalProps, 'data' | 'icon' | 'title'>;

export interface FilterModalProps {
  containerEl: PortalContainerEl;
  renderKey: string;
  values: SearchHierarchyParams;
  onSearch: (e: SearchHierarchyParams) => void;
}

export interface UpsertModalProps {
  data?: UpsertedData;
  icon?: IconCode;
  title?: string;
  onClose: () => void;

  onUpsertSuccess?: (
    mode: Extract<MutationMode, 'create' | 'update'>,
    item: HierarchyData<string>
  ) => void;
}

export interface HierarchyListItemProps {
  cols: number;
  data: HierarchyData<string>;
  disableDrag?: boolean;
  icon: IconCode;
  onDeleteConfirm?: (e: HierarchyData<string>) => void;
  onEditClick?: (e: UpsertedState) => void;
  onPublishClick?: (e: HierarchyData<string>) => void;
}

export interface HierarchyListProps
  extends Pick<ContainerProps, 'disableGutters' | 'maxWidth'>,
    Pick<HierarchyListItemProps, 'icon'> {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  initialData?: HierarchyData<string>[];
  superior?: string;
  toolbarEl?: PortalContainerEl;
  onMutationSuccess?: (mode: MutationMode, item: HierarchyData<string>) => void;
}

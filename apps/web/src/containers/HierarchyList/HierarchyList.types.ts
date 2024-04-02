import type { ContainerProps } from '@mui/material/Container';
import type { IconCode } from '@weavcraft/core';
import type { ReactNode } from 'react';

import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { PortalContainerEl } from '~web/components';

export type MutationMode = 'create' | 'update' | 'delete';

export type UpsertedData = Pick<HierarchyData<string>, 'category' | 'type'> &
  Omit<
    HierarchyData<string> | Partial<HierarchyData<undefined>>,
    'category' | 'type'
  >;

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
  actions?: ReactNode;
  data: HierarchyData<string>;
  icon: IconCode;
}

export interface HierarchyListProps
  extends Pick<ContainerProps, 'disableGutters' | 'maxWidth'>,
    Pick<HierarchyListItemProps, 'icon'> {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  superior?: string;
  toolbarEl?: PortalContainerEl;
  onMutationSuccess?: (mode: MutationMode, item: HierarchyData<string>) => void;
}

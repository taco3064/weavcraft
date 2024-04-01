import type { ContainerProps } from '@mui/material/Container';
import type { IconCode } from '@weavcraft/core';
import type { SearchHierarchyParams } from '@weavcraft/types';

import type { HierarchyData } from '~web/services';
import type { PortalContainerEl } from '~web/components';

export type MutationMode = 'create' | 'update' | 'delete';

export type UpsertedData = Pick<HierarchyData<string>, 'category' | 'type'> &
  Omit<
    HierarchyData<string> | Partial<HierarchyData<undefined>>,
    'category' | 'type'
  >;

export interface CollapseFilterProps {
  containerEl: PortalContainerEl;
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

export interface HierarchyListProps
  extends Pick<ContainerProps, 'disableGutters' | 'maxWidth'> {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  toolbarEl?: PortalContainerEl;
  onMutationSuccess?: (mode: MutationMode, item: HierarchyData<string>) => void;
}

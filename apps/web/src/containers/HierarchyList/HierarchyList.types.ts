import type { ContainerProps } from '@mui/material/Container';
import type { SearchHierarchyParams } from '@weavcraft/types';

import type { HierarchyData } from '~web/services';
import type { PortalContainerEl } from '~web/components';

type MutationType = 'create' | 'update' | 'delete';

export interface FilterProps {
  containerEl: PortalContainerEl;
  onSearch: (e: SearchHierarchyParams) => void;
}

export interface HierarchyListProps
  extends Pick<ContainerProps, 'disableGutters' | 'maxWidth'> {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;
  toolbarEl?: PortalContainerEl;

  onMutationSuccess?: <T extends MutationType>(
    type: MutationType,
    item: HierarchyData<T extends 'create' ? undefined : string>
  ) => void;
}

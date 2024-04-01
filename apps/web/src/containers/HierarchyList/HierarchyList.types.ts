import type { HierarchyData } from '~web/services';

type MutationType = 'create' | 'update' | 'delete';

export interface HierarchyListProps {
  category: string;
  disableGroup?: boolean;
  disablePublish?: boolean;

  onMutationSuccess?: <T extends MutationType>(
    type: MutationType,
    item: HierarchyData<T extends 'create' ? undefined : string>
  ) => void;
}

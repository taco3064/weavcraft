import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Breadcrumbs, HierarchyList } from '~web/containers';
import { PageContainer, TutorialModeAlert } from '~web/components';
import { getSuperiorHierarchies } from '~web/services';
import { useNavIcon } from '~web/hooks';
import { useTutorialMode } from '~web/contexts';

import type {
  BaseHierarchyProps,
  HierarchyListProps,
  PortalContainerEl,
} from './imports.types';

export function getBaseGroupPage<P>(
  category: string,
  hierarchyListProps?: Pick<
    HierarchyListProps<P>,
    'disableGroup' | 'disablePublish' | 'renderContent'
  >
) {
  return function BaseGroupPage({
    group,
    initialData,
    initialSuperiors,
  }: BaseHierarchyProps<P>) {
    const { t } = useTranslation();
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);

    const icon = useNavIcon(category);
    const isTutorialMode = useTutorialMode();

    const { data: superiors = initialSuperiors } = useQuery({
      enabled: Boolean(isTutorialMode && group),
      queryKey: [group as string, isTutorialMode],
      queryFn: getSuperiorHierarchies,
    });

    return (
      <PageContainer maxWidth="md">
        <Breadcrumbs
          disableGutters
          currentBreadcrumbLabel={group}
          currentPageTitle={
            !group ? t(`ttl-breadcrumbs.${category}.label`) : group
          }
          toolbar={setToolbarEl}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'group' && typeof value === 'string') {
              return superiors.map(({ id, title }) => ({
                label: title,
                href: [isTutorialMode ? '/tutorial' : '', category, id].join(
                  '/'
                ),
              }));
            }
          }}
        />

        <TutorialModeAlert />

        <HierarchyList
          {...hierarchyListProps}
          {...{ category, icon, initialData, superiors, toolbarEl }}
          disableGutters
          maxWidth="md"
        />
      </PageContainer>
    );
  };
}

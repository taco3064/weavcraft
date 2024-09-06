import { NextSeo } from 'next-seo';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Breadcrumbs, HierarchyList } from '~web/containers';
import { PageContainer, TutorialModeAlert } from '~web/components';
import { getSuperiorHierarchies } from '~web/services';
import { useNavIcon, useNextSeoProps, useTutorialMode } from '~web/hooks';

import type {
  BaseHierarchyProps,
  HierarchyListProps,
  MakePerPageLayout,
  PortalContainerEl,
} from './imports.types';

export const DETAIL_MARGIN_TOP = 16;

//* Per page layout HOC
export const makePerPageLayout: MakePerPageLayout = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};

//* Generate the base group page component
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
    const { pathname } = useRouter();
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);

    const seoProps = useNextSeoProps();
    const icon = useNavIcon(category);
    const isTutorialMode = useTutorialMode();
    const categoryTitle = t(`ttl-breadcrumbs.${category}.label`);

    const { data: superiors = initialSuperiors } = useQuery({
      enabled: Boolean(isTutorialMode && group),
      queryKey: [group as string, isTutorialMode],
      queryFn: getSuperiorHierarchies,
    });

    return (
      <PageContainer maxWidth="md">
        {isTutorialMode && (
          <NextSeo
            {...seoProps}
            title={`${categoryTitle} | ${t('tutorial:ttl-tutorial')}`}
            description={t(`ttl-breadcrumbs.${category}.description`)}
          />
        )}

        <Breadcrumbs
          disableGutters
          currentBreadcrumbLabel={group}
          currentPageTitle={!group ? categoryTitle : group}
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

        <TutorialModeAlert key={pathname} />

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

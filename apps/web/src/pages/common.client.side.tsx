import { NextSeo } from 'next-seo';
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
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);

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
            title={`${categoryTitle} | ${t('tutorial:ttl-tutorial')}`}
            description={t(`ttl-breadcrumbs.${category}.description`)}
            canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/tutorial/${category}`}
            openGraph={{
              title: t('ttl-weavcraft'),
              description: t('msg-short-intro'),
              images: [
                {
                  url: `${process.env.NEXT_PUBLIC_BASE_URL}/imgs/logo.png`,
                  width: 256,
                  height: 256,
                  alt: 'Logo',
                  type: 'image/png',
                },
              ],
            }}
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

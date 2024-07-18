import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, HierarchyList, MainLayout } from '~web/containers';
import { getHierarchyData, getSuperiorHierarchies } from '~web/services';
import { getServerSideTranslations, isUserEnvStatus } from '../pages.utils';
import { makePerPageLayout, useTutorialMode } from '~web/contexts';

import {
  PageContainer,
  PaletteViewer,
  TutorialModeAlert,
} from '~web/components';

import type {
  BaseHierarchyProps,
  PortalContainerEl,
  ThemePalette,
} from '../imports.types';

export default makePerPageLayout<BaseHierarchyProps<ThemePalette>>(MainLayout)(
  function ThemeGroupsPage({ group, initialData, initialSuperiors }) {
    const { t } = useTranslation();
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
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
          currentPageTitle={!group ? t('ttl-breadcrumbs.themes.label') : group}
          toolbar={setToolbarEl}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'group' && typeof value === 'string') {
              return superiors.map(({ id, title }) => ({
                href: `${isTutorialMode ? '/tutorial' : ''}/themes/${id}`,
                label: title,
              }));
            }
          }}
        />

        <TutorialModeAlert />

        <HierarchyList
          {...{ initialData, superiors, toolbarEl }}
          category="themes"
          disableGroup={false}
          disableGutters
          disablePublish={false}
          icon="faPalette"
          maxWidth="md"
          renderContent={(palette) => (
            <PaletteViewer
              disableBorder
              disableBorderRadius
              config={palette}
              size={200}
            />
          )}
        />
      </PageContainer>
    );
  }
);

export const getServerSideProps: GetServerSideProps<
  BaseHierarchyProps<ThemePalette>
> = async (ctx) => {
  const group =
    typeof ctx.query.group === 'string' ? ctx.query.group : undefined;

  const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

  const initialSuperiors =
    !group || isTutorialMode
      ? []
      : await getSuperiorHierarchies({ queryKey: [group] });

  if (await isUserEnvStatus(ctx, 'unauth', 'nontutorial')) {
    //* Redirect to home page if not authenticated and not in tutorial mode
    return { redirect: { destination: '/', permanent: false } };
  } else if (!isTutorialMode && group && !initialSuperiors.length) {
    //* Redirect to 404 page if group does not exist
    return { notFound: true };
  }

  return {
    props: {
      initialSuperiors,
      ...(group && { group }),
      ...(await getServerSideTranslations(ctx, 'themes')),

      initialData: isTutorialMode
        ? []
        : await getHierarchyData({
            queryKey: [
              { category: 'themes', superior: group, withPayload: true },
            ],
          }),
    },
  };
};

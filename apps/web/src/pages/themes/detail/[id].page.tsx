import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { getServerSideTranslations, isUserEnvStatus } from '../../pages.utils';
import { makePerPageLayout, useTutorialMode } from '~web/contexts';
import type { PortalContainerEl } from '~web/components';
import type { ThemeDetailPageProps } from './detail.types';

import {
  getHierarchyDataById,
  getThemePalette,
  getSuperiorHierarchies,
} from '~web/services';

export default makePerPageLayout<ThemeDetailPageProps>(MainLayout)(
  function ThemeDetailPage({
    id,
    initialData,
    initialHierarchy,
    initialSuperiors,
  }) {
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
    const { t } = useTranslation();
    const isTutorialMode = useTutorialMode();

    const [
      { data: hierarchy = initialHierarchy },
      { data: superiors = initialSuperiors },
    ] = useQueries({
      queries: [
        {
          enabled: isTutorialMode,
          queryHash: `hierarchy-${id}`,
          queryKey: [id, true],
          queryFn: getHierarchyDataById,
        },
        {
          enabled: isTutorialMode,
          queryHash: `superior-${id}`,
          queryKey: [id, true],
          queryFn: getSuperiorHierarchies,
        },
      ],
    });

    return !hierarchy ? null : (
      <>
        <Breadcrumbs
          customBreadcrumbs={{ '/themes/detail': 'hidden' }}
          currentBreadcrumbLabel={hierarchy.title}
          currentPageTitle={`${t('ttl-breadcrumbs.themes.label')} - ${
            hierarchy.title
          }`}
          onToolbarMount={setToolbarEl}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'id' && typeof value === 'string') {
              return superiors.map(({ _id, title }) => ({
                href: `${isTutorialMode ? '/tutorial' : ''}/themes/${_id}`,
                label: title,
              }));
            }
          }}
        />
      </>
    );
  }
);

export const getServerSideProps: GetServerSideProps<
  ThemeDetailPageProps
> = async (ctx) => {
  const id = ctx.query.id as string;
  const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

  const initialData = isTutorialMode
    ? undefined
    : await getThemePalette({ queryKey: [id] });

  const initialHierarchy = isTutorialMode
    ? undefined
    : await getHierarchyDataById({ queryKey: [id] });

  const initialSuperiors = isTutorialMode
    ? []
    : await getSuperiorHierarchies({ queryKey: [id] });

  if (await isUserEnvStatus(ctx, 'unauth', 'nontutorial')) {
    //* Redirect to home page if not authenticated and not in tutorial mode
    return { redirect: { destination: '/', permanent: false } };
  } else if (!isTutorialMode && !initialHierarchy) {
    //* Redirect to 404 page if detail does not exist
    return { notFound: true };
  }

  return {
    props: {
      id,
      initialSuperiors,
      ...(initialHierarchy && { initialHierarchy }),
      ...(initialData && { initialData }),
      ...(await getServerSideTranslations(ctx, ['themes'])),
    },
  };
};
import Container from '@mui/material/Container';
import { nanoid } from 'nanoid';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout, PaletteEditor } from '~web/containers';
import { TutorialModeAlert } from '~web/components';
import { getServerSideTranslations, isUserEnvStatus } from '../../pages.utils';
import { makePerPageLayout, useTutorialMode } from '~web/contexts';
import { usePageStyles } from '../../pages.styles';
import type { PortalContainerEl } from '~web/contexts';
import type { ThemeDetailPageProps } from './detail.types';

import {
  getHierarchyDataById,
  getThemePalette,
  getSuperiorHierarchies,
} from '~web/services';

export default makePerPageLayout<ThemeDetailPageProps>(MainLayout)(
  function ThemeDetailPage({
    hash,
    id,
    initialData,
    initialHierarchy,
    initialSuperiors,
  }) {
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
    const isTutorialMode = useTutorialMode();

    const { t } = useTranslation();
    const { classes } = usePageStyles();

    const [
      { data: hierarchy = initialHierarchy },
      { data: superiors = initialSuperiors },
      { data: config = initialData },
    ] = useQueries({
      queries: [
        {
          enabled: isTutorialMode,
          queryHash: `hierarchy-${hash}-${id}`,
          queryKey: [id, true],
          queryFn: getHierarchyDataById,
        },
        {
          enabled: isTutorialMode,
          queryHash: `superior-${hash}-${id}`,
          queryKey: [id, true],
          queryFn: getSuperiorHierarchies,
        },
        {
          enabled: isTutorialMode,
          queryHash: `theme-${hash}-${id}`,
          queryKey: [id, true],
          queryFn: getThemePalette,
        },
      ],
    });

    return !hierarchy ? null : (
      <Container component="main" maxWidth="md" className={classes.root}>
        <Breadcrumbs
          disableGutters
          toolbar={setToolbarEl}
          customBreadcrumbs={{ '/themes/detail': 'hidden' }}
          currentBreadcrumbLabel={hierarchy.title}
          currentPageTitle={`${t('ttl-breadcrumbs.themes.label')} - ${
            hierarchy.title
          }`}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'id' && typeof value === 'string') {
              return superiors.map(({ _id, title }) => ({
                href: `${isTutorialMode ? '/tutorial' : ''}/themes/${_id}`,
                label: title,
              }));
            }
          }}
        />

        <TutorialModeAlert />

        <PaletteEditor
          maxWidth="md"
          config={config}
          size={360}
          title={hierarchy.title}
          toolbarEl={toolbarEl}
        />
      </Container>
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
      hash: nanoid(),
      initialSuperiors,
      ...(initialHierarchy && { initialHierarchy }),
      ...(initialData && { initialData }),
      ...(await getServerSideTranslations(ctx, 'themes')),
    },
  };
};

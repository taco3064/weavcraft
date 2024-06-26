import Container from '@mui/material/Container';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout, PaletteEditor } from '~web/containers';
import { TutorialModeAlert } from '~web/components';
import { getServerSideTranslations, isUserEnvStatus } from '../../pages.utils';
import { useInitializationConfig, type InitializationConfig } from '~web/hooks';
import { usePageStyles } from '../../pages.styles';

import {
  makePerPageLayout,
  useTutorialMode,
  type PortalContainerEl,
} from '~web/contexts';

import {
  getHierarchyDataById,
  getThemePalette,
  getSuperiorHierarchies,
  type ThemePalette,
} from '~web/services';

export default makePerPageLayout<InitializationConfig<ThemePalette>>(
  MainLayout
)(function ThemeDetailPage(props) {
  const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
  const isTutorialMode = useTutorialMode();

  const { t } = useTranslation();
  const { classes } = usePageStyles();

  const { config, hierarchy, superiors } = useInitializationConfig(
    getThemePalette,
    props
  );

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
            return superiors.map(({ id, title }) => ({
              href: `${isTutorialMode ? '/tutorial' : ''}/themes/${id}`,
              label: title,
            }));
          }
        }}
      />

      <TutorialModeAlert />

      <PaletteEditor
        maxWidth="md"
        config={config}
        marginTop={16}
        size={360}
        title={hierarchy.title}
        toolbarEl={toolbarEl}
      />
    </Container>
  );
});

export const getServerSideProps: GetServerSideProps<
  InitializationConfig<ThemePalette>
> = async (ctx) => {
  const id = ctx.query.id as string;
  const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

  const hierarchy = isTutorialMode
    ? undefined
    : await getHierarchyDataById({ queryKey: [id] });

  const config =
    isTutorialMode || !hierarchy?.payloadId
      ? undefined
      : await getThemePalette({ queryKey: [hierarchy.payloadId] });

  const superiors = isTutorialMode
    ? []
    : await getSuperiorHierarchies({ queryKey: [id] });

  if (await isUserEnvStatus(ctx, 'unauth', 'nontutorial')) {
    //* Redirect to home page if not authenticated and not in tutorial mode
    return { redirect: { destination: '/', permanent: false } };
  } else if (!isTutorialMode && !hierarchy) {
    //* Redirect to 404 page if detail does not exist
    return { notFound: true };
  }

  return {
    props: {
      id,
      hash: nanoid(),
      superiors,
      ...(hierarchy && { hierarchy }),
      ...(config && { config }),
      ...(await getServerSideTranslations(ctx, 'themes')),
    },
  };
};

import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, HierarchyList, MainLayout } from '~web/containers';
import { PaletteViewer, TutorialModeAlert } from '~web/components';
import { getHierarchyData, getSuperiorHierarchies } from '~web/services';
import { getServerSideTranslations, isUserEnvStatus } from '../pages.utils';
import { usePageStyles } from '../pages.styles';
import type { ThemesPageProps } from './themes.types';

import {
  makePerPageLayout,
  useTutorialMode,
  type PortalContainerEl,
} from '~web/contexts';

export default makePerPageLayout<ThemesPageProps>(MainLayout)(
  function ThemeGroupsPage({ group, initialData, initialSuperiors }) {
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
    const isTutorialMode = useTutorialMode();

    const { t } = useTranslation();
    const { classes } = usePageStyles();

    const { data: superiors = initialSuperiors } = useQuery({
      enabled: Boolean(isTutorialMode && group),
      queryKey: [group as string, true],
      queryFn: getSuperiorHierarchies,
    });

    return (
      <Container component="main" maxWidth="md" className={classes.root}>
        <Breadcrumbs
          disableGutters
          currentBreadcrumbLabel={group}
          currentPageTitle={!group ? t('ttl-breadcrumbs.themes.label') : group}
          toolbar={setToolbarEl}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'group' && typeof value === 'string') {
              return superiors.map(({ _id, title }) => ({
                href: `${isTutorialMode ? '/tutorial' : ''}/themes/${_id}`,
                label: title,
              }));
            }
          }}
        />

        <TutorialModeAlert />

        <HierarchyList
          {...{ initialData, isTutorialMode, toolbarEl }}
          category="themes"
          disableGroup={false}
          disableGutters
          disablePublish={false}
          icon="faPalette"
          maxWidth="md"
          superior={group}
          renderPreview={(palette) => (
            <PaletteViewer disableBorderRadius config={palette} size={200} />
          )}
        />
      </Container>
    );
  }
);

export const getServerSideProps: GetServerSideProps<ThemesPageProps> = async (
  ctx
) => {
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

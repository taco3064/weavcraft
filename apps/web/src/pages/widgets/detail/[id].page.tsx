import Container from '@mui/material/Container';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
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
  getSuperiorHierarchies,
  getWidgetProps,
  getWidgetConfigs,
} from '~web/services';

export default makePerPageLayout<InitializationConfig<unknown>>(MainLayout)(
  function ThemeDetailPage(props) {
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
    const isTutorialMode = useTutorialMode();

    const { t } = useTranslation();
    const { classes } = usePageStyles();

    const { config, hierarchy, superiors } = useInitializationConfig(
      getWidgetConfigs,
      props
    );

    /** Next.js /api === TEST START */
    const res = useQuery({
      queryHash: `props-${props.hash}`,
      queryKey: ['Icon'],
      queryFn: getWidgetProps,
    });
    /** Next.js /api === TEST END */

    return !hierarchy ? null : (
      <Container component="main" maxWidth="md" className={classes.root}>
        <Breadcrumbs
          disableGutters
          toolbar={setToolbarEl}
          customBreadcrumbs={{ '/widgets/detail': 'hidden' }}
          currentBreadcrumbLabel={hierarchy.title}
          currentPageTitle={`${t('ttl-breadcrumbs.widgets.label')} - ${
            hierarchy.title
          }`}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'id' && typeof value === 'string') {
              return superiors.map(({ id, title }) => ({
                href: `${isTutorialMode ? '/tutorial' : ''}/widgets/${id}`,
                label: title,
              }));
            }
          }}
        />

        <TutorialModeAlert />
      </Container>
    );
  }
);

export const getServerSideProps: GetServerSideProps<
  InitializationConfig<unknown>
> = async (ctx) => {
  const id = ctx.query.id as string;
  const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

  const config = isTutorialMode
    ? undefined
    : await getWidgetConfigs({ queryKey: [id] });

  const hierarchy = isTutorialMode
    ? undefined
    : await getHierarchyDataById({ queryKey: [id] });

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
      ...(await getServerSideTranslations(ctx, 'widgets')),
    },
  };
};

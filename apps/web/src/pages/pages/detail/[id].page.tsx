import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { NextSeo } from 'next-seo';
import { Suspense, useState } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout, PageLayoutsEditor } from '~web/containers';
import { DETAIL_MARGIN_TOP, makePerPageLayout } from '../../common.client.side';
import { PageContainer, TutorialModeAlert } from '~web/components';
import { getTranslations, isUserEnvStatus } from '../../common.server.side';
import { useInitializationConfig, useTutorialMode } from '~web/hooks';

import {
  getHierarchyDataById,
  getSuperiorHierarchies,
  getPageLayouts,
} from '~web/services';

import type {
  InitializationConfig,
  PageLayoutConfigs,
  PortalContainerEl,
} from '../../imports.types';

export default makePerPageLayout<InitializationConfig<PageLayoutConfigs>>(
  MainLayout
)(function PageLayoutsPage(props) {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);
  const isTutorialMode = useTutorialMode();

  const { config, hierarchy, superiors } = useInitializationConfig(
    getPageLayouts,
    props
  );

  return !hierarchy ? null : (
    <PageContainer maxWidth="md">
      <NextSeo
        title={`${t('ttl-breadcrumbs.pages.label')} - ${hierarchy.title} | ${t(
          'ttl-weavcraft'
        )}`}
      />

      <Breadcrumbs
        disableGutters
        toolbar={setToolbarEl}
        customBreadcrumbs={{ '/pages/detail': 'hidden' }}
        currentBreadcrumbLabel={hierarchy.title}
        currentPageTitle={`${t('ttl-breadcrumbs.pages.label')} - ${
          hierarchy.title
        }`}
        onCatchAllRoutesTransform={(key, value) => {
          if (key === 'id' && typeof value === 'string') {
            return superiors.map(({ id, title }) => ({
              href: `${isTutorialMode ? '/tutorial' : ''}/pages/${id}`,
              label: title,
            }));
          }
        }}
      />

      <Suspense
        fallback={
          <>
            <LinearProgress sx={{ width: '100%' }} />

            <Typography variant="h6" color="text.disabled">
              {t('msg-definitions-loading')}
            </Typography>
          </>
        }
      >
        <TutorialModeAlert key={pathname} />

        <PageLayoutsEditor
          config={config}
          marginTop={DETAIL_MARGIN_TOP}
          title={hierarchy.title}
          toolbarEl={toolbarEl}
        />
      </Suspense>
    </PageContainer>
  );
});

export const getServerSideProps: GetServerSideProps<
  InitializationConfig<PageLayoutConfigs>
> = async (ctx) => {
  const id = ctx.query.id as string;
  const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

  const config = isTutorialMode
    ? undefined
    : await getPageLayouts({ queryKey: [id] });

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
      ...(await getTranslations(ctx, 'widgets', 'pages')),
    },
  };
};
